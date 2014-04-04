.directive('responsiveNav', ['$compile', '$parse', function ($compile, $parse) {
    return {
        templateUrl: 'responsive-menu.html',
        replace: true,
        link: function (scope, element, attrs, controller) {
            //get passed in max to show
            var maxInView = scope.$eval(attrs.maxInView) || 3; //this should be the max that fits well on big screens
            var getItems = $parse(attrs.getItems); //the method to call to populate items
            var onItemClickCallback = $parse(attrs.itemClick); //the method to call to handle the item click event
            var broadcastKey = attrs.navBroadcastKey; //instead od using the onItemClickCallback, it will trigger a broadcast when the item is clicked 

            scope.showMore = false;
            getItems(scope, {}).then(function (result) {
                //find links that aren't displayed - this will be set by css depending on screen size
                scope.items = result;
                if (result.length > maxInView) {
                    scope.showMore = true;
                    var moreLink = angular.element(element[0].querySelector('.nav-more'));
                    moreLink.find('a').bind('click', function (evt) {
                        var allLinks = element.find('li');
                        var hiddenItems = [];
                        for (var i = 0; i < allLinks.length; i++) {
                            if (allLinks[i].clientWidth === 0) { //if it's display:none, then it will have no width
                                hiddenItems.push(scope.items[i]);
                            }
                        }
                        scope.$apply(function () {
                            scope.dropDownItems = hiddenItems;
                        });

                    });
                }
            });

            scope.activeFilter = 0;

            scope.onSelect = function ($index, isDropdown) {
                scope.activeFilter = $index;
                var item;
                if (!isDropdown)
                    item = scope.items[$index];
                else
                    item = scope.dropDownItems[$index];

                //if we have a callback, use that and pass the broadcast key
                if (angular.isDefined(onItemClickCallback)) {
                    onItemClickCallback(scope, { item: item, broadcastKey: broadcastKey });
                }
                else if (angular.isDefined(broadcastKey)) {
                    //else if we have a broadcast key
                    scope.$broadcast(broadcastKey, item);
                }

            };

            scope.isActiveFilter = function (matchIdx) {
                return scope.activeFilter === matchIdx;
            };
        }
    };
}])
