var app = angular.module("app", [])

.controller("NavController", ["$scope", "$location", '$q', function ($scope, $location, $q) {

    $scope.getNavItems = function () {
        //This must return a promise
	      var items = [];
        var deferred = $q.defer();

	      items.push({ "name": "Nav 1", "view": "ok" });
        items.push({ "name": "Nav 2", "view": "whatever" });
        items.push({ "name": "Nav 3", "view": "great" });

	      items.push({ "name": "Google", "url": "http://google.com" });
	      items.push({ "name": "Angular JS", "url": "http://angularjs.org/" });
	      items.push({ "name": "Angular Translate Rocks", "url": "https://github.com/angular-translate/angular-translate" });

        deferred.resolve(items);

        return deferred.promise;

    };

    $scope.onItemSelect = function (item, broadcastKey) {
	      //Handle when the nav item is clicked
        if (angular.isDefined(item.url)) {
            //$location.path(item.url);
            window.open(item.url);
            return;
        }

        if (broadcastKey)
            $scope.$broadcast(broadcastKey, item);

    };

    
}])
.directive('responsiveNav', ['$rootScope', '$compile', '$parse', function ($rootScope, $compile, $parse) {
    return {
        templateUrl: 'responsive-nav.html',
        replace: true,
        link: function (scope, element, attrs, controller) {
            //get passed in max to show
            var maxInView = scope.$eval(attrs.maxInView) || 3; //this should be the max that fits well on big screens
            var getItems = $parse(attrs.getItems); //the method to call to populate items
            var onItemClickCallback = $parse(attrs.itemClick); //the method to call to handle the item click event
            var broadcastKey = attrs.navBroadcastKey; //instead of calling the click callback method, it will trigger a broadcast from the root scope when the item is clicked 

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
                    $rootScope.$broadcast(broadcastKey, item);
                }

            };

            scope.isActiveFilter = function (matchIdx) {
                return scope.activeFilter === matchIdx;
            };
        }
    };
}])
/*
.directive('dropdownToggle', ['$document', '$location', function ($document, $location) {
    var openElement = null,
        closeMenu = angular.noop;
    return {
        restrict: 'CA',
        link: function (scope, element, attrs) {
            scope.$watch('$location.path', function () { closeMenu(); });
            element.parent().bind('click', function () { closeMenu(); });
            element.bind('click', function (event) {

                var elementWasOpen = (element === openElement);

                event.preventDefault();
                event.stopPropagation();

                if (!!openElement) {
                    closeMenu();
                }

                if (!elementWasOpen && !element.hasClass('disabled') && !element.prop('disabled')) {
                    element.parent().addClass('open');
                    openElement = element;
                    closeMenu = function (event) {
                        if (event) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        $document.unbind('click', closeMenu);
                        element.parent().removeClass('open');
                        closeMenu = angular.noop;
                        openElement = null;
                    };
                    $document.bind('click', closeMenu);
                }
            });
        }
    };
}]) */
;

