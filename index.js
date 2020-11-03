function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactRedux = require('react-redux');
var redux = require('redux');
var createDebounce = _interopDefault(require('redux-debounced'));
var thunk = _interopDefault(require('redux-thunk'));
var react = require('redux-persist/integration/react');
var reduxPersist = require('redux-persist');
var Axios = _interopDefault(require('axios'));
var Icon = require('react-feather');
var reactToastify = require('react-toastify');
var axiosExtensions = require('axios-extensions');
var history$1 = require('history');
var sessionStorage = _interopDefault(require('redux-persist/es/storage/session'));
var reactRouterDom = require('react-router-dom');
var classnames = _interopDefault(require('classnames'));
var reactstrap = require('reactstrap');
var PerfectScrollbar = _interopDefault(require('react-perfect-scrollbar'));
var ReactDOM = _interopDefault(require('react-dom'));
var PropTypes = _interopDefault(require('prop-types'));
var reactIntl = require('react-intl');
var ScrollToTop = _interopDefault(require('react-scroll-up'));
var Hammer = _interopDefault(require('react-hammerjs'));
var Select$1 = _interopDefault(require('react-select'));
var chroma = _interopDefault(require('chroma-js'));
var Flatpickr = _interopDefault(require('react-flatpickr'));
var formik = require('formik');
var Yup = require('yup');
var TopBarProgress = _interopDefault(require('react-topbar-progress-indicator'));
var Ripples = _interopDefault(require('react-ripples'));
require('react-perfect-scrollbar/dist/css/styles.css');
require('react-toastify/dist/ReactToastify.css');
require('prismjs/themes/prism-tomorrow.css');

var HttpClient = Axios.create({
  timeout: 5000,
  adapter: axiosExtensions.throttleAdapterEnhancer(axiosExtensions.cacheAdapterEnhancer(Axios.defaults.adapter, {
    threshold: 15 * 60 * 1000
  }))
});

HttpClient.addAuthTokenToHeader = function (authToken) {
  HttpClient.defaults.headers.Authorization = "Bearer " + authToken;
};

HttpClient.removeAuthTokenFromHeader = function () {
  delete HttpClient.defaults.headers.Authorization;
};

var errorMessage = function errorMessage(message) {
  return /*#__PURE__*/React__default.createElement("div", {
    className: "d-flex align-items-center"
  }, /*#__PURE__*/React__default.createElement(Icon.AlertTriangle, null), " ", /*#__PURE__*/React__default.createElement("span", {
    className: "ml-1"
  }, message));
};
var setUpHttpClient = function setUpHttpClient(store) {
  HttpClient.interceptors.request.use(function (config) {
    if (!config.isBackgroundRequest) {
      store.dispatch({
        type: 'SHOW_LOADING_BAR'
      });
    }

    return config;
  });
  HttpClient.interceptors.response.use(function (response) {
    store.dispatch({
      type: 'HIDE_LOADING_BAR'
    });
    return response;
  }, function (e) {
    store.dispatch({
      type: 'HIDE_LOADING_BAR'
    });

    if (!e.response) {
      return e;
    }

    switch (e.response.status) {
      case 404:
        reactToastify.toast.error(errorMessage('API Not Found !'));
        return e.response;

      case 400:
        reactToastify.toast.error(errorMessage('Bad Request !'));
        return e.response;

      case 408:
        reactToastify.toast.error(errorMessage('Request Timeout !'));
        return e.response;

      case 500:
        reactToastify.toast.error(errorMessage('Server error !'));
        return e.response;

      default:
        throw e;
    }
  });
};

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var themeConfig = {
  layout: "vertical",
  theme: "light",
  sidebarCollapsed: false,
  navbarColor: "default",
  navbarType: "floating",
  footerType: "static",
  disableCustomizer: true,
  hideScrollToTop: false,
  disableThemeTour: false,
  menuTheme: "primary",
  direction: "ltr",
  showLoading: false
};

var customizerReducer = function customizerReducer(state, action) {
  if (state === void 0) {
    state = _extends({}, themeConfig);
  }

  switch (action.type) {
    case 'CHANGE_MODE':
      return _extends({}, state, {
        theme: action.mode
      });

    case 'COLLAPSE_SIDEBAR':
      return _extends({}, state, {
        sidebarCollapsed: action.value
      });

    case 'CHANGE_NAVBAR_COLOR':
      return _extends({}, state, {
        navbarColor: action.color
      });

    case 'CHANGE_NAVBAR_TYPE':
      return _extends({}, state, {
        navbarType: action.style
      });

    case 'CHANGE_FOOTER_TYPE':
      return _extends({}, state, {
        footerType: action.style
      });

    case 'CHANGE_MENU_COLOR':
      return _extends({}, state, {
        menuTheme: action.style
      });

    case 'HIDE_SCROLL_TO_TOP':
      return _extends({}, state, {
        hideScrollToTop: action.value
      });

    case 'SHOW_LOADING_BAR':
      return _extends({}, state, {
        showLoadingBar: true
      });

    case 'HIDE_LOADING_BAR':
      return _extends({}, state, {
        showLoadingBar: false
      });

    default:
      return state;
  }
};

var API_LOGIN_URL = 'http://localhost:8086/api/authenticate';
var API_LOGOUT_URL = 'https://api.mocki.io/v1/5e448c60';
var API_GET_NAV_CONFIGS = 'http://localhost:8100/api/roles';
var API_R_200 = 200;
var LOGIN_STATUS = {
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL'
};
var APP_URL = 'http://localhost:3000';
var IMAGE = {
  LOGO: 'https://sit.inon.vn/PortalWeb/nth/assets/images/InOn-logo.png',
  LOGO_WHITE: 'https://firebasestorage.googleapis.com/v0/b/inon-8d496.appspot.com/o/Logo.png?alt=media&token=d61feda7-c2be-423a-9d64-da13dca88b85',
  LANDING_PAGE_BG: 'https://firebasestorage.googleapis.com/v0/b/inon-8d496.appspot.com/o/IO-Signup-01%203%20(1).png?alt=media&token=19aca74e-c81f-40e2-a00d-a91b7ee9f27a',
  DOWNLOAD_APP_IOS: 'https://firebasestorage.googleapis.com/v0/b/inon-8d496.appspot.com/o/IO-APP%26GP-03.png?alt=media&token=c9a13eca-3fe6-40d0-ac1d-df417b95385d',
  DOWNLOAD_APP_ANDROID: 'https://firebasestorage.googleapis.com/v0/b/inon-8d496.appspot.com/o/IO-APP%26GP-01.png?alt=media&token=b2aefa9d-d464-41d3-9fd0-b374ed0dca93'
};

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

var history = history$1.createBrowserHistory({
  basename: ''
});

var AuthService = function AuthService() {};

AuthService.login = function (user) {
  return HttpClient.post(API_LOGIN_URL, user);
};

AuthService.logout = function (user) {
  return HttpClient.post(API_LOGOUT_URL, user);
};

AuthService.checkLoginByToken = function () {
  return HttpClient.get(API_LOGIN_URL);
};

var LOGIN_ACTION = 'LOGIN_ACTION';
var LOGIN_FAIL_ACTION = 'LOGIN_FAIL_ACTION';
var LOOUT_ACTION = 'LOGOUT_ACTION';
var checkLoginStatus = function checkLoginStatus(authToken) {
  return function (dispatch) {
    try {
      var _temp2 = _catch(function () {
        return Promise.resolve(AuthService.checkLoginByToken()).then(function (respone) {
          if (respone.status === API_R_200) {
            dispatch({
              type: LOGIN_ACTION,
              payload: authToken
            });
          } else {
            dispatch({
              type: LOGIN_ACTION,
              payload: 'authToken'
            });
          }
        });
      }, function () {
        dispatch({
          type: LOGIN_ACTION,
          payload: 'authToken'
        });
      });

      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
};
var loginAction = function loginAction(user) {
  return function (dispatch) {
    try {
      var _temp4 = _catch(function () {
        return Promise.resolve(AuthService.login(user)).then(function (respone) {
          if (respone.status === API_R_200) {
            dispatch({
              type: LOGIN_ACTION,
              payload: respone.data.id_token
            });
            history.push('/');
          } else {
            dispatch({
              type: LOGIN_ACTION,
              payload: 'authToken'
            });
          }
        });
      }, function () {
        dispatch({
          type: LOGIN_ACTION,
          payload: 'authToken'
        });
      });

      return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
};
var logoutAction = function logoutAction(user) {
  return function (dispatch) {
    try {
      var _temp6 = _catch(function () {
        return Promise.resolve(AuthService.logout(user)).then(function (respone) {
          if (respone.status === API_R_200) {
            dispatch({
              type: LOOUT_ACTION
            });
            history.push('/');
          }
        });
      }, function () {});

      return Promise.resolve(_temp6 && _temp6.then ? _temp6.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
};

var authInitialState = {
  authToken: '',
  user: '',
  loginStatus: ''
};
var authReducers = function authReducers(state, action) {
  if (state === void 0) {
    state = _extends({}, authInitialState);
  }

  switch (action.type) {
    case LOGIN_ACTION:
      {
        HttpClient.addAuthTokenToHeader(action.payload);
        return _extends({}, state, {
          authToken: action.payload,
          loginStatus: LOGIN_STATUS.SUCCESS
        });
      }

    case LOOUT_ACTION:
      {
        HttpClient.removeAuthTokenFromHeader('Authorization');
        return _extends({}, authInitialState);
      }

    case LOGIN_FAIL_ACTION:
      {
        return _extends({}, state, {
          loginStatus: LOGIN_STATUS.FAIL
        });
      }

    default:
      return state;
  }
};

var AppId = {
  APP_NO1: 'APP_NO1',
  INSURANCE_APP: 'INSURANCE_APP',
  SUPPLEMENT_APP: 'SUPPLEMENT_APP'
};

var _ref;
var navigationConfig = [{
  id: 'buyInsurance',
  appId: AppId.INSURANCE_APP,
  type: 'item',
  title: 'menu.buyInsurance',
  icon: /*#__PURE__*/React__default.createElement(Icon.ShoppingCart, {
    size: 20
  }),
  navLink: '/buy-insurance'
}, {
  id: 'contractManagement',
  appId: AppId.INSURANCE_APP,
  title: 'menu.contractManagement',
  icon: /*#__PURE__*/React__default.createElement(Icon.FileText, {
    size: 20
  }),
  permissions: ['admin', 'editor'],
  navLink: '/contracts',
  type: 'collapse',
  children: [{
    id: 'personalContracts',
    type: 'item',
    title: 'menu.personalContracts',
    icon: /*#__PURE__*/React__default.createElement(Icon.Circle, {
      size: 20
    }),
    navLink: '/contracts/personal'
  }, {
    id: 'partnerContracts',
    type: 'item',
    title: 'menu.partnerContracts',
    icon: /*#__PURE__*/React__default.createElement(Icon.Circle, {
      size: 20
    }),
    navLink: '/contracts/partner'
  }, {
    id: 'allContracts',
    type: 'item',
    title: 'menu.allContracts',
    icon: /*#__PURE__*/React__default.createElement(Icon.Circle, {
      size: 20
    }),
    navLink: '/contracts/all'
  }]
}, {
  id: 'account',
  appId: AppId.APP_NO1,
  title: 'menu.account',
  icon: /*#__PURE__*/React__default.createElement(Icon.User, {
    size: 20
  }),
  permissions: ['admin', 'editor'],
  navLink: '/accounts',
  type: 'collapse',
  children: [{
    id: 'createAccount',
    type: 'item',
    title: 'menu.createAccount',
    icon: /*#__PURE__*/React__default.createElement(Icon.Circle, {
      size: 20
    }),
    navLink: '/accounts/create'
  }, {
    id: 'accountManagement',
    type: 'item',
    title: 'menu.accountManagement',
    icon: /*#__PURE__*/React__default.createElement(Icon.Circle, {
      size: 20
    }),
    navLink: '/accounts/management'
  }]
}, {
  id: 'insuranceFeeManagement',
  appId: AppId.INSURANCE_APP,
  title: 'menu.insuranceFeeManagement',
  icon: /*#__PURE__*/React__default.createElement(Icon.DollarSign, {
    size: 20
  }),
  permissions: ['admin', 'editor'],
  navLink: '/insurance-fee',
  type: 'collapse',
  children: [{
    id: 'systemFee',
    type: 'item',
    title: 'menu.systemFee',
    icon: /*#__PURE__*/React__default.createElement(Icon.Circle, {
      size: 20
    }),
    navLink: '/insurance-fee/system'
  }, {
    id: 'personalFee',
    type: 'item',
    title: 'menu.personalFee',
    icon: /*#__PURE__*/React__default.createElement(Icon.Circle, {
      size: 20
    }),
    navLink: '/insurance-fee/personal'
  }, {
    id: 'partnerFee',
    type: 'item',
    title: 'menu.partnerFee',
    icon: /*#__PURE__*/React__default.createElement(Icon.Circle, {
      size: 20
    }),
    navLink: '/insurance-fee/partner'
  }, {
    id: 'allFee',
    type: 'item',
    title: 'menu.allFee',
    icon: /*#__PURE__*/React__default.createElement(Icon.Circle, {
      size: 20
    }),
    navLink: '/insurance-fee/all'
  }]
}, {
  id: 'bonusManagement',
  appId: AppId.SUPPLEMENT_APP,
  title: 'menu.bonusManagement',
  icon: /*#__PURE__*/React__default.createElement(Icon.TrendingUp, {
    size: 20
  }),
  permissions: ['admin', 'editor'],
  navLink: '/bonus',
  type: 'collapse',
  children: [{
    id: 'systemBonus',
    type: 'item',
    title: 'menu.systemBonus',
    icon: /*#__PURE__*/React__default.createElement(Icon.Circle, {
      size: 20
    }),
    navLink: '/bonus/system'
  }, {
    id: 'personalBonus',
    type: 'item',
    title: 'menu.personalBonus',
    icon: /*#__PURE__*/React__default.createElement(Icon.Circle, {
      size: 20
    }),
    navLink: '/bonus/personal'
  }, {
    id: 'partnerBonus',
    type: 'item',
    title: 'menu.partnerBonus',
    icon: /*#__PURE__*/React__default.createElement(Icon.Circle, {
      size: 20
    }),
    navLink: '/bonus/partner'
  }, {
    id: 'allBonus',
    type: 'item',
    title: 'menu.allBonus',
    icon: /*#__PURE__*/React__default.createElement(Icon.Circle, {
      size: 20
    }),
    navLink: '/bonus/all'
  }]
}, (_ref = {
  id: 'insuranceCertificate',
  appId: AppId.INSURANCE_APP,
  type: 'item',
  title: 'menu.insuranceCertificate',
  icon: /*#__PURE__*/React__default.createElement(Icon.Award, {
    size: 20
  }),
  permissions: ['admin', 'editor'],
  navLink: '/insurance-certificate'
}, _ref["type"] = 'collapse', _ref.children = [{
  id: 'newImport',
  type: 'item',
  title: 'menu.insuranceCertificate.newImport',
  icon: /*#__PURE__*/React__default.createElement(Icon.Circle, {
    size: 20
  }),
  navLink: '/insurance-certificate/new-import'
}, {
  id: 'newExport',
  type: 'item',
  title: 'menu.insuranceCertificate.newImport',
  icon: /*#__PURE__*/React__default.createElement(Icon.Circle, {
    size: 20
  }),
  navLink: '/insurance-certificate/new-export'
}, {
  id: 'wrongImport',
  type: 'item',
  title: 'menu.insuranceCertificate.wrongImport',
  icon: /*#__PURE__*/React__default.createElement(Icon.Circle, {
    size: 20
  }),
  navLink: '/insurance-certificate/wrong-import'
}, {
  id: 'wrongExport',
  type: 'item',
  title: 'menu.insuranceCertificate.wrongExport',
  icon: /*#__PURE__*/React__default.createElement(Icon.Circle, {
    size: 20
  }),
  navLink: '/insurance-certificate/wrong-export'
}], _ref), {
  id: 'debt',
  appId: AppId.SUPPLEMENT_APP,
  title: 'menu.debt',
  icon: /*#__PURE__*/React__default.createElement(Icon.CreditCard, {
    size: 20
  }),
  permissions: ['admin', 'editor'],
  type: 'collapse',
  navLink: '/debt',
  children: [{
    id: 'createDebt',
    type: 'item',
    title: 'menu.createDebt',
    icon: /*#__PURE__*/React__default.createElement(Icon.Circle, {
      size: 20
    }),
    navLink: '/debt/create'
  }, {
    id: 'debtManagement',
    type: 'item',
    title: 'menu.debtManagement',
    icon: /*#__PURE__*/React__default.createElement(Icon.Circle, {
      size: 20
    }),
    navLink: '/debt/management'
  }]
}, {
  id: 'permissionGoup',
  appId: AppId.SUPPLEMENT_APP,
  type: 'collapse',
  title: 'menu.permissionGoup',
  icon: /*#__PURE__*/React__default.createElement(Icon.Share2, {
    size: 20
  }),
  permissions: ['admin', 'editor'],
  navLink: '/permission-group',
  children: [{
    id: 'creatPermissionGoup',
    type: 'item',
    title: 'menu.creatPermissionGoup',
    icon: /*#__PURE__*/React__default.createElement(Icon.Circle, {
      size: 20
    }),
    navLink: '/permission-group/create'
  }, {
    id: 'permissionGoupManagement',
    type: 'item',
    title: 'menu.permissionGoupManagement',
    icon: /*#__PURE__*/React__default.createElement(Icon.Circle, {
      size: 20
    }),
    navLink: '/permission-group/management'
  }]
}];

var mapRoleListToNavConfigs = function mapRoleListToNavConfigs(roleList) {
  if (roleList === void 0) {
    roleList = [];
  }

  roleList = roleList.filter(function (item) {
    return item.order < 1000;
  });
  var mapRoles = new Map();
  roleList.forEach(function (role) {
    var listRole = mapRoles.get(role.parentId);
    var itemNav = mapRoleToNavItem(role);

    if (listRole) {
      listRole.push(itemNav);
      mapRoles.set(role.parentId, listRole);
    } else {
      mapRoles.set(role.parentId, [itemNav]);
    }
  });
  var parentList = mapRoles.get(null);
  return parentList.map(function (item) {
    item.children = mapRoles.get(item.id + '');
    return item;
  });
};

var mapRoleToNavItem = function mapRoleToNavItem(role) {
  var item = {};
  item.id = role.id;
  item.type = 'item';
  item.code = role.code;
  item.appId = role.appId;
  item.title = "menu." + role.keyLang;
  item.icon = Icon[role.icon];
  item.navLink = role.menuPath;

  if (role.isHighlight) {
    item.badge = 'primary';
    item.badgeText = 'new';
  }

  return item;
};

var getNativgationConfig = function getNativgationConfig(appId, navConfigs) {
  if (!navConfigs) {
    navConfigs = [].concat(navigationConfig);
  } else {
    navConfigs = mapRoleListToNavConfigs(navConfigs);
  }

  return navConfigs.map(function (item) {
    item.isExternalApp = item.appId !== appId;

    if (item.children) {
      item.children.map(function (child) {
        return child.isExternalApp = child.appId !== appId;
      });

      if (item.children.length === 1) {
        item.navLink = item.children[0].navLink;
      } else {
        item.type = 'collapse';
      }
    }

    return item;
  });
};

var NavBarService = function NavBarService() {};

NavBarService.getNativagtion = function () {
  return HttpClient.get(API_GET_NAV_CONFIGS);
};

var LOAD_NATIVGATION = 'LOAD_NATIVGATION';

var initialState = {
  navConfigs: [],
  roles: []
};

var navbarReducer = function navbarReducer(state, action) {
  if (state === void 0) {
    state = initialState;
  }

  switch (action.type) {
    case LOAD_NATIVGATION:
      return _extends({}, state, action.payload);

    default:
      return state;
  }
};

var rootReducer = function rootReducer(appReducer) {
  return redux.combineReducers({
    customizer: customizerReducer,
    auth: reduxPersist.persistReducer({
      storage: sessionStorage,
      key: 'root',
      blacklist: ['loginStatus']
    }, authReducers),
    navbar: navbarReducer,
    app: appReducer
  });
};

var Autocomplete = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Autocomplete, _React$Component);

  function Autocomplete(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.onSuggestionItemClick = function (url, e) {
      if (_this.props.onSuggestionClick) {
        _this.props.onSuggestionClick(e);
      }

      _this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: e.currentTarget.innerText
      });

      if (url) history.push(url);
    };

    _this.onSuggestionItemHover = function (index) {
      _this.setState({
        activeSuggestion: index
      });
    };

    _this.onChange = function (e) {
      var userInput = e.currentTarget.value;

      _this.setState({
        activeSuggestion: 0,
        showSuggestions: true,
        userInput: userInput
      });

      if (e.target.value < 1) {
        _this.setState({
          showSuggestions: false
        });
      }
    };

    _this.onInputClick = function (e) {
      e.stopPropagation();
    };

    _this.onKeyDown = function (e) {
      var _this$state = _this.state,
          activeSuggestion = _this$state.activeSuggestion,
          showSuggestions = _this$state.showSuggestions,
          userInput = _this$state.userInput;
      var filterKey = _this.props.filterKey;
      var suggestionList = ReactDOM.findDOMNode(_this.suggestionList);

      if (e.keyCode === 38 && activeSuggestion !== 0) {
        _this.setState({
          activeSuggestion: activeSuggestion - 1
        });

        if (e.target.value.length > -1 && suggestionList !== null && activeSuggestion <= _this.filteredData.length / 2) {
          suggestionList.scrollTop = 0;
        }
      } else if (e.keyCode === 40 && activeSuggestion < _this.filteredData.length - 1) {
          _this.setState({
            activeSuggestion: activeSuggestion + 1
          });

          if (e.target.value.length > -1 && suggestionList !== null && activeSuggestion >= _this.filteredData.length / 2) {
            suggestionList.scrollTop = suggestionList.scrollHeight;
          }
        } else if (e.keyCode === 27) {
            _this.setState({
              showSuggestions: false,
              userInput: ''
            });
          } else if (e.keyCode === 13 && showSuggestions) {
              _this.onSuggestionItemClick(_this.filteredData[activeSuggestion].link, e);

              _this.setState({
                userInput: _this.filteredData[activeSuggestion][filterKey],
                showSuggestions: false
              });
            } else {
              return;
            }

      if (_this.props.onKeyDown !== undefined && _this.props.onKeyDown !== null && _this.props.onKeyDown) {
        _this.props.onKeyDown(e, userInput);
      }
    };

    _this.renderGroupedSuggestion = function (arr) {
      var _this$props = _this.props,
          filterKey = _this$props.filterKey,
          customRender = _this$props.customRender;

      var _assertThisInitialize = _assertThisInitialized(_this),
          onSuggestionItemClick = _assertThisInitialize.onSuggestionItemClick,
          onSuggestionItemHover = _assertThisInitialize.onSuggestionItemHover,
          _assertThisInitialize2 = _assertThisInitialize.state,
          activeSuggestion = _assertThisInitialize2.activeSuggestion,
          userInput = _assertThisInitialize2.userInput;

      var renderSuggestion = function renderSuggestion(item, i) {
        if (!customRender) {
          return /*#__PURE__*/React__default.createElement("li", {
            className: classnames('suggestion-item', {
              active: _this.filteredData.indexOf(item) === activeSuggestion
            }),
            key: item[filterKey],
            onClick: function onClick(e) {
              return onSuggestionItemClick(item.link, e);
            },
            onMouseEnter: function onMouseEnter() {
              _this.onSuggestionItemHover(_this.filteredData.indexOf(item));
            }
          }, item[filterKey]);
        } else if (customRender) {
          return customRender(item, i, _this.filteredData, activeSuggestion, onSuggestionItemClick, onSuggestionItemHover, userInput);
        } else {
          return null;
        }
      };

      return arr.map(function (item, i) {
        return renderSuggestion(item, i);
      });
    };

    _this.renderUngroupedSuggestions = function () {
      var _this$filteredData;

      var _this$props2 = _this.props,
          filterKey = _this$props2.filterKey,
          suggestions = _this$props2.suggestions,
          customRender = _this$props2.customRender,
          suggestionLimit = _this$props2.suggestionLimit;

      var _assertThisInitialize3 = _assertThisInitialized(_this),
          onSuggestionItemClick = _assertThisInitialize3.onSuggestionItemClick,
          onSuggestionItemHover = _assertThisInitialize3.onSuggestionItemHover,
          _assertThisInitialize4 = _assertThisInitialize3.state,
          activeSuggestion = _assertThisInitialize4.activeSuggestion,
          userInput = _assertThisInitialize4.userInput;

      _this.filteredData = [];
      var sortSingleData = suggestions.filter(function (i) {
        var startCondition = i[filterKey].toLowerCase().startsWith(userInput.toLowerCase()),
            includeCondition = i[filterKey].toLowerCase().includes(userInput.toLowerCase());

        if (startCondition) {
          return startCondition;
        } else if (!startCondition && includeCondition) {
          return includeCondition;
        } else {
          return null;
        }
      }).slice(0, suggestionLimit);

      (_this$filteredData = _this.filteredData).push.apply(_this$filteredData, sortSingleData);

      return sortSingleData.map(function (suggestion, index) {
        if (!customRender) {
          return /*#__PURE__*/React__default.createElement("li", {
            className: classnames('suggestion-item', {
              active: _this.filteredData.indexOf(suggestion) === activeSuggestion
            }),
            key: suggestion[filterKey],
            onClick: function onClick(e) {
              return onSuggestionItemClick(suggestion.link ? suggestion.link : null, e);
            },
            onMouseEnter: function onMouseEnter() {
              return _this.onSuggestionItemHover(_this.filteredData.indexOf(suggestion));
            }
          }, suggestion[filterKey]);
        } else if (customRender) {
          return customRender(suggestion, index, _this.filteredData, activeSuggestion, onSuggestionItemClick, onSuggestionItemHover, userInput);
        } else {
          return null;
        }
      });
    };

    _this.renderSuggestions = function () {
      var _this$props3 = _this.props,
          filterKey = _this$props3.filterKey,
          grouped = _this$props3.grouped,
          filterHeaderKey = _this$props3.filterHeaderKey,
          suggestions = _this$props3.suggestions;

      var _assertThisInitialize5 = _assertThisInitialized(_this),
          renderUngroupedSuggestions = _assertThisInitialize5.renderUngroupedSuggestions,
          userInput = _assertThisInitialize5.state.userInput;

      if (grouped === undefined || grouped === null || !grouped) {
        return renderUngroupedSuggestions();
      } else {
        _this.filteredData = [];
        return suggestions.map(function (suggestion) {
          var _this$filteredData2;

          var sortData = suggestion.data.filter(function (i) {
            var startCondition = i[filterKey].toLowerCase().startsWith(userInput.toLowerCase()),
                includeCondition = i[filterKey].toLowerCase().includes(userInput.toLowerCase());

            if (startCondition) {
              return startCondition;
            } else if (!startCondition && includeCondition) {
              return includeCondition;
            } else {
              return null;
            }
          }).slice(0, suggestion.searchLimit);

          (_this$filteredData2 = _this.filteredData).push.apply(_this$filteredData2, sortData);

          return /*#__PURE__*/React__default.createElement(React__default.Fragment, {
            key: suggestion[filterHeaderKey]
          }, /*#__PURE__*/React__default.createElement("li", {
            className: "suggestion-item suggestion-title text-primary text-bold-600"
          }, suggestion[filterHeaderKey]), sortData.length ? _this.renderGroupedSuggestion(sortData) : /*#__PURE__*/React__default.createElement("li", {
            className: "suggestion-item no-result"
          }, /*#__PURE__*/React__default.createElement(Icon.AlertTriangle, {
            size: 15
          }), ' ', /*#__PURE__*/React__default.createElement("span", {
            className: "align-middle ml-50"
          }, "No Result")));
        });
      }
    };

    _this.clearInput = function (val) {
      if (_this.props.clearInput && !val) {
        _this.setState({
          userInput: ''
        });
      }
    };

    _this.handleExtenalClick = function (e) {
      var container = _this.refs.container;
      var target = e.target;

      if (target !== container && !container.contains(target)) {
        _this.setState({
          showSuggestions: false
        });

        if (_this.props.externalClick) _this.props.externalClick(e);
      }
    };

    _this.state = {
      activeSuggestion: 0,
      showSuggestions: false,
      userInput: '',
      focused: false,
      openUp: false
    };
    _this.filteredData = [];
    document.body.addEventListener('click', _this.handleExtenalClick);
    return _this;
  }

  var _proto = Autocomplete.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var textInput = ReactDOM.findDOMNode(this.input);
    var _this$props4 = this.props,
        autoFocus = _this$props4.autoFocus,
        onSuggestionsShown = _this$props4.onSuggestionsShown,
        clearInput = _this$props4.clearInput;

    if (textInput !== null && autoFocus) {
      textInput.focus();
    }

    if (this.props.defaultSuggestions && prevState.showSuggestions === false && this.state.focused) {
      this.setState({
        showSuggestions: true
      });
    }

    if (clearInput === false && this.state.userInput.length) {
      this.setState({
        userInput: ''
      });
    }

    if (onSuggestionsShown && this.state.showSuggestions) {
      onSuggestionsShown(this.state.userInput);
    }

    if (this.props.defaultSuggestions && prevState.focused === false && this.state.focused === true) {
      this.setState({
        showSuggestions: true
      });
    }
  };

  _proto.componentDidMount = function componentDidMount() {
    if (this.props.defaultSuggestions && this.state.focused) {
      this.setState({
        showSuggestions: true
      });
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    document.body.removeEventListener('click', this.handleExtenalClick);
  };

  _proto.render = function render() {
    var _this2 = this;

    var _onChange = this.onChange,
        _onKeyDown = this.onKeyDown,
        _this$state2 = this.state,
        showSuggestions = _this$state2.showSuggestions,
        userInput = _this$state2.userInput,
        openUp = _this$state2.openUp;
    var suggestionsListComponent;

    if (showSuggestions) {
      suggestionsListComponent = /*#__PURE__*/React__default.createElement(PerfectScrollbar, {
        className: classnames('suggestions-list', {
          'open-up': openUp
        }),
        ref: function ref(el) {
          return _this2.suggestionList = el;
        },
        component: "ul",
        options: {
          wheelPropagation: false
        }
      }, this.renderSuggestions());
    }

    return /*#__PURE__*/React__default.createElement("div", {
      className: "vx-autocomplete-container",
      ref: "container"
    }, /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, {
      className: "form-label-group position-relative"
    }, /*#__PURE__*/React__default.createElement("input", {
      type: "text",
      onChange: function onChange(e) {
        _onChange(e);

        if (_this2.props.onChange) {
          _this2.props.onChange(e);
        }
      },
      onKeyDown: function onKeyDown(e) {
        return _onKeyDown(e);
      },
      value: userInput,
      className: "vx-autocomplete-search " + (this.props.className ? this.props.className : ''),
      placeholder: this.props.placeholder,
      onClick: this.onInputClick,
      ref: function ref(el) {
        return _this2.input = el;
      },
      onFocus: function onFocus(e) {
        _this2.setState({
          focused: true
        });
      },
      autoFocus: this.props.autoFocus,
      onBlur: function onBlur(e) {
        if (_this2.props.onBlur) _this2.props.onBlur(e);

        _this2.setState({
          focused: false
        });
      }
    }), /*#__PURE__*/React__default.createElement(reactstrap.Label, null, this.props.placeholder), suggestionsListComponent));
  };

  return Autocomplete;
}(React__default.Component);
Autocomplete.propTypes = {
  suggestions: PropTypes.array.isRequired,
  filterKey: PropTypes.string.isRequired,
  filterHeaderKey: PropTypes.string,
  placeholder: PropTypes.string,
  suggestionLimit: PropTypes.number,
  grouped: PropTypes.bool,
  autoFocus: PropTypes.bool,
  onKeyDown: PropTypes.func,
  onChange: PropTypes.func,
  onSuggestionsShown: PropTypes.func,
  onSuggestionItemClick: PropTypes.func
};

var UserDropdown = function UserDropdown(props) {
  var logoutAction = props.logoutAction;
  var history = reactRouterDom.useHistory();

  var handleNavigation = function handleNavigation(e, path) {
    e.preventDefault();
    history.push(path);
  };

  return /*#__PURE__*/React__default.createElement(reactstrap.DropdownMenu, {
    right: true
  }, /*#__PURE__*/React__default.createElement(reactstrap.DropdownItem, {
    tag: "a",
    href: "#",
    onClick: function onClick(e) {
      return handleNavigation(e, '/account-info');
    }
  }, /*#__PURE__*/React__default.createElement(Icon.Settings, {
    size: 14,
    className: "mr-50"
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "align-middle"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "setting.accountInformation"
  }))), /*#__PURE__*/React__default.createElement(reactstrap.DropdownItem, {
    tag: "a",
    href: "#",
    onClick: function onClick(e) {
      return handleNavigation(e, '/change-password');
    }
  }, /*#__PURE__*/React__default.createElement(Icon.Lock, {
    size: 14,
    className: "mr-50"
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "align-middle"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "setting.changePassword"
  }))), /*#__PURE__*/React__default.createElement(reactstrap.DropdownItem, {
    divider: true
  }), /*#__PURE__*/React__default.createElement(reactstrap.DropdownItem, {
    tag: "a",
    href: "#",
    onClick: function onClick(e) {
      return handleNavigation(e, '/terms-and-condition');
    }
  }, /*#__PURE__*/React__default.createElement(Icon.Lock, {
    size: 14,
    className: "mr-50"
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "align-middle"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "setting.termAndCondition"
  }))), /*#__PURE__*/React__default.createElement(reactstrap.DropdownItem, {
    tag: "a",
    href: "#",
    onClick: function onClick(e) {
      return handleNavigation(e, '/privacy-policy');
    }
  }, /*#__PURE__*/React__default.createElement(Icon.Lock, {
    size: 14,
    className: "mr-50"
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "align-middle"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "setting.privacyPolicy"
  }))), /*#__PURE__*/React__default.createElement(reactstrap.DropdownItem, {
    tag: "a",
    href: "#",
    onClick: function onClick(e) {
      return handleNavigation(e, '/language');
    }
  }, /*#__PURE__*/React__default.createElement(Icon.Lock, {
    size: 14,
    className: "mr-50"
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "align-middle"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "setting.language"
  }))), /*#__PURE__*/React__default.createElement(reactstrap.DropdownItem, {
    tag: "a",
    href: "#",
    onClick: function onClick(e) {
      return handleNavigation(e, '/contact');
    }
  }, /*#__PURE__*/React__default.createElement(Icon.Lock, {
    size: 14,
    className: "mr-50"
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "align-middle"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "setting.contact"
  }))), /*#__PURE__*/React__default.createElement(reactstrap.DropdownItem, {
    divider: true
  }), /*#__PURE__*/React__default.createElement(reactstrap.DropdownItem, {
    tag: "a",
    onClick: logoutAction
  }, /*#__PURE__*/React__default.createElement(Icon.Power, {
    size: 14,
    className: "mr-50"
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "align-middle"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "navbar.logout"
  }))));
};

var NavbarUser = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(NavbarUser, _React$PureComponent);

  function NavbarUser() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;
    _this.state = {
      navbarSearch: false,
      suggestions: []
    };

    _this.handleNavbarSearch = function () {
      _this.setState({
        navbarSearch: !_this.state.navbarSearch
      });
    };

    _this.getCountryCode = function (locale) {
      var countryCode = {
        en: 'us',
        vi: 'vn'
      };
      return countryCode[locale];
    };

    return _this;
  }

  var _proto = NavbarUser.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
  };

  _proto.render = function render() {
    var _this2 = this;

    return /*#__PURE__*/React__default.createElement("ul", {
      className: "nav navbar-nav navbar-nav-user float-right"
    }, /*#__PURE__*/React__default.createElement(reactstrap.NavItem, {
      className: "nav-search",
      onClick: this.handleNavbarSearch
    }, /*#__PURE__*/React__default.createElement(reactstrap.NavLink, {
      className: "nav-link-search"
    }, /*#__PURE__*/React__default.createElement(Icon.Search, {
      size: 21,
      "data-tour": "search"
    })), /*#__PURE__*/React__default.createElement("div", {
      className: classnames('search-input', {
        open: this.state.navbarSearch,
        'd-none': this.state.navbarSearch === false
      })
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "search-input-icon"
    }, /*#__PURE__*/React__default.createElement(Icon.Search, {
      size: 17,
      className: "primary"
    })), /*#__PURE__*/React__default.createElement(Autocomplete, {
      className: "form-control",
      suggestions: this.state.suggestions,
      filterKey: "title",
      filterHeaderKey: "groupTitle",
      grouped: true,
      placeholder: "Explore Vuexy...",
      autoFocus: true,
      clearInput: this.state.navbarSearch,
      externalClick: function externalClick(e) {
        _this2.setState({
          navbarSearch: false
        });
      },
      onKeyDown: function onKeyDown(e) {
        if (e.keyCode === 27 || e.keyCode === 13) {
          _this2.setState({
            navbarSearch: false
          });

          _this2.props.handleAppOverlay('');
        }
      },
      customRender: function customRender(item, i, filteredData, activeSuggestion, onSuggestionItemClick, onSuggestionItemHover) {
        var IconTag = Icon[item.icon ? item.icon : 'X'];
        return /*#__PURE__*/React__default.createElement("li", {
          className: classnames('suggestion-item', {
            active: filteredData.indexOf(item) === activeSuggestion
          }),
          key: i,
          onClick: function onClick(e) {
            return onSuggestionItemClick(item.link, e);
          },
          onMouseEnter: function onMouseEnter() {
            return onSuggestionItemHover(filteredData.indexOf(item));
          }
        }, /*#__PURE__*/React__default.createElement("div", {
          className: classnames({
            'd-flex justify-content-between align-items-center': item.file || item.img
          })
        }, /*#__PURE__*/React__default.createElement("div", {
          className: "item-container d-flex"
        }, item.icon ? /*#__PURE__*/React__default.createElement(IconTag, {
          size: 17
        }) : item.file ? /*#__PURE__*/React__default.createElement("img", {
          src: item.file,
          height: "36",
          width: "28",
          alt: item.title
        }) : item.img ? /*#__PURE__*/React__default.createElement("img", {
          className: "rounded-circle mt-25",
          src: item.img,
          height: "28",
          width: "28",
          alt: item.title
        }) : null, /*#__PURE__*/React__default.createElement("div", {
          className: "item-info ml-1"
        }, /*#__PURE__*/React__default.createElement("p", {
          className: "align-middle mb-0"
        }, item.title), item.by || item.email ? /*#__PURE__*/React__default.createElement("small", {
          className: "text-muted"
        }, item.by ? item.by : item.email ? item.email : null) : null)), item.size || item.date ? /*#__PURE__*/React__default.createElement("div", {
          className: "meta-container"
        }, /*#__PURE__*/React__default.createElement("small", {
          className: "text-muted"
        }, item.size ? item.size : item.date ? item.date : null)) : null));
      },
      onSuggestionsShown: function onSuggestionsShown(userInput) {
        if (_this2.state.navbarSearch) {
          _this2.props.handleAppOverlay(userInput);
        }
      }
    }), /*#__PURE__*/React__default.createElement("div", {
      className: "search-input-close"
    }, /*#__PURE__*/React__default.createElement(Icon.X, {
      size: 24,
      onClick: function onClick(e) {
        e.stopPropagation();

        _this2.setState({
          navbarSearch: false
        });

        _this2.props.handleAppOverlay('');
      }
    })))), /*#__PURE__*/React__default.createElement(reactstrap.UncontrolledDropdown, {
      tag: "li",
      className: "dropdown-notification nav-item"
    }, /*#__PURE__*/React__default.createElement(reactstrap.DropdownToggle, {
      tag: "a",
      className: "nav-link nav-link-label"
    }, /*#__PURE__*/React__default.createElement(Icon.Bell, {
      size: 21
    }), /*#__PURE__*/React__default.createElement(reactstrap.Badge, {
      pill: true,
      color: "primary",
      className: "badge-up"
    }, ' ', "5", ' ')), /*#__PURE__*/React__default.createElement(reactstrap.DropdownMenu, {
      tag: "ul",
      right: true,
      className: "dropdown-menu-media"
    }, /*#__PURE__*/React__default.createElement("li", {
      className: "dropdown-menu-header"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "dropdown-header mt-0"
    }, /*#__PURE__*/React__default.createElement("h3", {
      className: "text-white"
    }, "5 New"), /*#__PURE__*/React__default.createElement("span", {
      className: "notification-title"
    }, "App Notifications"))), /*#__PURE__*/React__default.createElement(PerfectScrollbar, {
      className: "media-list overflow-hidden position-relative",
      options: {
        wheelPropagation: false
      }
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "d-flex justify-content-between"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      className: "d-flex align-items-start"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      left: true,
      href: "#"
    }, /*#__PURE__*/React__default.createElement(Icon.PlusSquare, {
      className: "font-medium-5 primary",
      size: 21
    })), /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      body: true
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      heading: true,
      className: "primary media-heading",
      tag: "h6"
    }, "You have new order!"), /*#__PURE__*/React__default.createElement("p", {
      className: "notification-text"
    }, "Are your going to meet me tonight?")), /*#__PURE__*/React__default.createElement("small", null, /*#__PURE__*/React__default.createElement("time", {
      className: "media-meta",
      dateTime: "2015-06-11T18:29:20+08:00"
    }, "9 hours ago")))), /*#__PURE__*/React__default.createElement("div", {
      className: "d-flex justify-content-between"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      className: "d-flex align-items-start"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      left: true,
      href: "#"
    }, /*#__PURE__*/React__default.createElement(Icon.DownloadCloud, {
      className: "font-medium-5 success",
      size: 21
    })), /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      body: true
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      heading: true,
      className: "success media-heading",
      tag: "h6"
    }, "99% Server load"), /*#__PURE__*/React__default.createElement("p", {
      className: "notification-text"
    }, "You got new order of goods?")), /*#__PURE__*/React__default.createElement("small", null, /*#__PURE__*/React__default.createElement("time", {
      className: "media-meta",
      dateTime: "2015-06-11T18:29:20+08:00"
    }, "5 hours ago")))), /*#__PURE__*/React__default.createElement("div", {
      className: "d-flex justify-content-between"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      className: "d-flex align-items-start"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      left: true,
      href: "#"
    }, /*#__PURE__*/React__default.createElement(Icon.AlertTriangle, {
      className: "font-medium-5 danger",
      size: 21
    })), /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      body: true
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      heading: true,
      className: "danger media-heading",
      tag: "h6"
    }, "Warning Notification"), /*#__PURE__*/React__default.createElement("p", {
      className: "notification-text"
    }, "Server has used 99% of CPU")), /*#__PURE__*/React__default.createElement("small", null, /*#__PURE__*/React__default.createElement("time", {
      className: "media-meta",
      dateTime: "2015-06-11T18:29:20+08:00"
    }, "Today")))), /*#__PURE__*/React__default.createElement("div", {
      className: "d-flex justify-content-between"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      className: "d-flex align-items-start"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      left: true,
      href: "#"
    }, /*#__PURE__*/React__default.createElement(Icon.CheckCircle, {
      className: "font-medium-5 info",
      size: 21
    })), /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      body: true
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      heading: true,
      className: "info media-heading",
      tag: "h6"
    }, "Complete the task"), /*#__PURE__*/React__default.createElement("p", {
      className: "notification-text"
    }, "One of your task is pending.")), /*#__PURE__*/React__default.createElement("small", null, /*#__PURE__*/React__default.createElement("time", {
      className: "media-meta",
      dateTime: "2015-06-11T18:29:20+08:00"
    }, "Last week")))), /*#__PURE__*/React__default.createElement("div", {
      className: "d-flex justify-content-between"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      className: "d-flex align-items-start"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      left: true,
      href: "#"
    }, /*#__PURE__*/React__default.createElement(Icon.File, {
      className: "font-medium-5 warning",
      size: 21
    })), /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      body: true
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      heading: true,
      className: "warning media-heading",
      tag: "h6"
    }, "Generate monthly report"), /*#__PURE__*/React__default.createElement("p", {
      className: "notification-text"
    }, "Reminder to generate monthly report")), /*#__PURE__*/React__default.createElement("small", null, /*#__PURE__*/React__default.createElement("time", {
      className: "media-meta",
      dateTime: "2015-06-11T18:29:20+08:00"
    }, "Last month"))))), /*#__PURE__*/React__default.createElement("li", {
      className: "dropdown-menu-footer"
    }, /*#__PURE__*/React__default.createElement(reactstrap.DropdownItem, {
      tag: "a",
      className: "p-1 text-center"
    }, /*#__PURE__*/React__default.createElement("span", {
      className: "align-middle"
    }, "Read all notifications"))))), /*#__PURE__*/React__default.createElement(reactstrap.UncontrolledDropdown, {
      tag: "li",
      className: "dropdown-user nav-item"
    }, /*#__PURE__*/React__default.createElement(reactstrap.DropdownToggle, {
      tag: "a",
      className: "nav-link dropdown-user-link"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "user-nav d-sm-flex d-none"
    }, /*#__PURE__*/React__default.createElement("span", {
      className: "user-name text-bold-600"
    }, this.props.userName), /*#__PURE__*/React__default.createElement("span", {
      className: "user-status"
    }, "Available")), /*#__PURE__*/React__default.createElement("span", {
      "data-tour": "user"
    }, /*#__PURE__*/React__default.createElement("img", {
      src: "https://storage.live.com/Users/-6155523327610065665/MyProfile/ExpressionProfile/ProfilePhoto:Win8Static,UserTileMedium,UserTileStatic",
      className: "round",
      height: "40",
      width: "40",
      alt: "avatar"
    }))), /*#__PURE__*/React__default.createElement(UserDropdown, this.props)));
  };

  return NavbarUser;
}(React__default.PureComponent);

var ThemeNavbar = function ThemeNavbar(props) {
  var colorsArr = ['primary', 'danger', 'success', 'info', 'warning', 'dark'];
  var navbarTypes = ['floating', 'static', 'sticky', 'hidden'];
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: "content-overlay"
  }), /*#__PURE__*/React__default.createElement("div", {
    className: "header-navbar-shadow"
  }), /*#__PURE__*/React__default.createElement(reactstrap.Navbar, {
    className: classnames('header-navbar navbar-expand-lg navbar navbar-with-menu navbar-shadow', {
      'navbar-light': props.navbarColor === 'default' || !colorsArr.includes(props.navbarColor),
      'navbar-dark': colorsArr.includes(props.navbarColor),
      'bg-primary': props.navbarColor === 'primary' && props.navbarType !== 'static',
      'bg-danger': props.navbarColor === 'danger' && props.navbarType !== 'static',
      'bg-success': props.navbarColor === 'success' && props.navbarType !== 'static',
      'bg-info': props.navbarColor === 'info' && props.navbarType !== 'static',
      'bg-warning': props.navbarColor === 'warning' && props.navbarType !== 'static',
      'bg-dark': props.navbarColor === 'dark' && props.navbarType !== 'static',
      'd-none': props.navbarType === 'hidden' && !props.horizontal,
      'floating-nav': props.navbarType === 'floating' && !props.horizontal || !navbarTypes.includes(props.navbarType) && !props.horizontal,
      'navbar-static-top': props.navbarType === 'static' && !props.horizontal,
      'fixed-top': props.navbarType === 'sticky' || props.horizontal,
      scrolling: props.horizontal && props.scrolling
    })
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "navbar-wrapper"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "navbar-container content"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "navbar-collapse d-flex justify-content-between align-items-center",
    id: "navbar-mobile"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "bookmark-wrapper"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "mr-auto float-left bookmark-wrapper d-flex align-items-center"
  }, /*#__PURE__*/React__default.createElement("ul", {
    className: "navbar-nav d-xl-none"
  }, /*#__PURE__*/React__default.createElement(reactstrap.NavItem, {
    className: "mobile-menu mr-auto"
  }, /*#__PURE__*/React__default.createElement(reactstrap.NavLink, {
    className: "nav-menu-main menu-toggle hidden-xs is-active",
    onClick: props.sidebarVisibility
  }, /*#__PURE__*/React__default.createElement(Icon.Menu, {
    className: "ficon"
  })))), /*#__PURE__*/React__default.createElement("ul", {
    className: "nav navbar-nav bookmark-icons"
  }, /*#__PURE__*/React__default.createElement(reactstrap.NavItem, null, /*#__PURE__*/React__default.createElement(reactstrap.NavLink, null, /*#__PURE__*/React__default.createElement(Icon.Star, {
    className: "text-warning",
    size: 21
  })))))), /*#__PURE__*/React__default.createElement(NavbarUser, {
    handleAppOverlay: props.handleAppOverlay,
    changeCurrentLang: props.changeCurrentLang,
    userName: props.name,
    roles: props.roles,
    isAuthenticated: props.isAuthenticated,
    logoutAction: props.logoutAction
  }))))));
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    name: state.auth.name,
    isAuthenticated: !!state.auth.name,
    roles: state.navbar.roles
  };
};

var Navbar = reactRedux.connect(mapStateToProps, {
  logoutAction: logoutAction
})(ThemeNavbar);

function useDeviceDetect() {
  var _React$useState = React__default.useState(false),
      isMobile = _React$useState[0],
      setMobile = _React$useState[1];

  React__default.useEffect(function () {
    var userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
    var mobile = Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
    setMobile(mobile);
  }, []);
  return {
    isMobile: isMobile
  };
}

var Footer = function Footer(props) {
  var _useDeviceDetect = useDeviceDetect(),
      isMobile = _useDeviceDetect.isMobile;

  return /*#__PURE__*/React__default.createElement("footer", null, /*#__PURE__*/React__default.createElement("div", {
    className: classnames('footer footer-light', {
      'd-none': isMobile
    })
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "d-flex justify-content-between"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "float-md-left d-block d-md-inline-block mt-25"
  }, /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "footer.copyRight"
  })), /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "footer.companySlogan"
  }))), /*#__PURE__*/React__default.createElement("div", {
    className: "float-md-right d-none d-md-block"
  }, /*#__PURE__*/React__default.createElement("a", {
    className: "mr-1",
    href: "https://www.apple.com/app-store/",
    target: "_blank"
  }, /*#__PURE__*/React__default.createElement("img", {
    src: IMAGE.DOWNLOAD_APP_IOS,
    alt: "DOWNLOAD ON APP STORE"
  })), /*#__PURE__*/React__default.createElement("a", {
    href: "https://play.google.com/store/apps",
    target: "_blank"
  }, /*#__PURE__*/React__default.createElement("img", {
    src: IMAGE.DOWNLOAD_APP_ANDROID,
    alt: "DOWNLOAD ON APP I"
  }))))), /*#__PURE__*/React__default.createElement("div", {
    className: classnames('footer footer-light footer-mobile', {
      'd-none': !isMobile
    })
  }, /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("a", {
    className: "tab-link",
    href: "#"
  }, /*#__PURE__*/React__default.createElement(Icon.Home, null))), /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("a", {
    className: "tab-link",
    href: "#"
  }, /*#__PURE__*/React__default.createElement(Icon.List, null))), /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("a", {
    className: "tab-link",
    href: "#"
  }, /*#__PURE__*/React__default.createElement(Icon.PlusCircle, null))), /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("a", {
    className: "tab-link",
    href: "#"
  }, /*#__PURE__*/React__default.createElement(Icon.Gift, null))), /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("a", {
    className: "tab-link"
  }, /*#__PURE__*/React__default.createElement(Icon.MessageSquare, null)))), props.hideScrollToTop === false ? /*#__PURE__*/React__default.createElement(ScrollToTop, {
    showUnder: 160
  }, /*#__PURE__*/React__default.createElement(reactstrap.Button, {
    color: "primary",
    className: "btn-icon scroll-top"
  }, /*#__PURE__*/React__default.createElement(Icon.ArrowUp, {
    size: 15
  }))) : null);
};

var changeMode = function changeMode(mode) {
  return function (dispatch) {
    return dispatch({
      type: "CHANGE_MODE",
      mode: mode
    });
  };
};
var collapseSidebar = function collapseSidebar(value) {
  return function (dispatch) {
    return dispatch({
      type: "COLLAPSE_SIDEBAR",
      value: value
    });
  };
};
var changeNavbarColor = function changeNavbarColor(color) {
  return function (dispatch) {
    return dispatch({
      type: "CHANGE_NAVBAR_COLOR",
      color: color
    });
  };
};
var changeNavbarType = function changeNavbarType(style) {
  return function (dispatch) {
    return dispatch({
      type: "CHANGE_NAVBAR_TYPE",
      style: style
    });
  };
};
var changeFooterType = function changeFooterType(style) {
  return function (dispatch) {
    return dispatch({
      type: "CHANGE_FOOTER_TYPE",
      style: style
    });
  };
};
var changeMenuColor = function changeMenuColor(style) {
  return function (dispatch) {
    return dispatch({
      type: "CHANGE_MENU_COLOR",
      style: style
    });
  };
};
var hideScrollToTop = function hideScrollToTop(value) {
  return function (dispatch) {
    return dispatch({
      type: "HIDE_SCROLL_TO_TOP",
      value: value
    });
  };
};

var SidebarHeader = /*#__PURE__*/function (_Component) {
  _inheritsLoose(SidebarHeader, _Component);

  function SidebarHeader() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = SidebarHeader.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        toggleSidebarMenu = _this$props.toggleSidebarMenu,
        activeTheme = _this$props.activeTheme,
        collapsed = _this$props.collapsed,
        toggle = _this$props.toggle,
        sidebarVisibility = _this$props.sidebarVisibility,
        menuShadow = _this$props.menuShadow;
    return /*#__PURE__*/React__default.createElement("div", {
      className: "navbar-header"
    }, /*#__PURE__*/React__default.createElement("ul", {
      className: "nav navbar-nav flex-row"
    }, /*#__PURE__*/React__default.createElement("li", {
      className: "nav-item my-auto mr-auto"
    }, /*#__PURE__*/React__default.createElement(reactstrap.NavLink, {
      to: "/"
    }, /*#__PURE__*/React__default.createElement("img", {
      className: "img-fluid logo-img",
      src: IMAGE.LOGO,
      alt: "logo"
    }))), /*#__PURE__*/React__default.createElement("li", {
      className: "nav-item nav-toggle"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "nav-link modern-nav-toggle"
    }, collapsed === false ? /*#__PURE__*/React__default.createElement(Icon.Disc, {
      onClick: function onClick() {
        toggleSidebarMenu(true);
        toggle();
      },
      className: classnames('toggle-icon icon-x d-none d-xl-block font-medium-4', {
        'text-primary': activeTheme === 'primary',
        'text-success': activeTheme === 'success',
        'text-danger': activeTheme === 'danger',
        'text-info': activeTheme === 'info',
        'text-warning': activeTheme === 'warning',
        'text-dark': activeTheme === 'dark'
      }),
      size: 20,
      "data-tour": "toggle-icon"
    }) : /*#__PURE__*/React__default.createElement(Icon.Circle, {
      onClick: function onClick() {
        toggleSidebarMenu(false);
        toggle();
      },
      className: classnames('toggle-icon icon-x d-none d-xl-block font-medium-4', {
        'text-primary': activeTheme === 'primary',
        'text-success': activeTheme === 'success',
        'text-danger': activeTheme === 'danger',
        'text-info': activeTheme === 'info',
        'text-warning': activeTheme === 'warning',
        'text-dark': activeTheme === 'dark'
      }),
      size: 20
    }), /*#__PURE__*/React__default.createElement(Icon.X, {
      onClick: sidebarVisibility,
      className: classnames('toggle-icon icon-x d-block d-xl-none font-medium-4', {
        'text-primary': activeTheme === 'primary',
        'text-success': activeTheme === 'success',
        'text-danger': activeTheme === 'danger',
        'text-info': activeTheme === 'info',
        'text-warning': activeTheme === 'warning',
        'text-dark': activeTheme === 'dark'
      }),
      size: 20
    })))), /*#__PURE__*/React__default.createElement("div", {
      className: classnames('shadow-bottom', {
        'd-none': menuShadow === false
      })
    }));
  };

  return SidebarHeader;
}(React.Component);

var SideMenuGroup = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(SideMenuGroup, _React$Component);

  function SideMenuGroup(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      isOpen: false,
      activeItem: _this.props.activePath
    };

    _this.handleActiveItem = function (url) {
      _this.setState({
        activeItem: url
      });
    };

    _this.flag = true;
    _this.parentArray = [];
    _this.childObj = {};
    return _this;
  }

  var _proto = SideMenuGroup.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (prevProps.activePath !== this.props.activePath) {
      if (this.childObj.navLink && this.childObj.collapsed) {
        this.props.collapsedMenuPaths(this.childObj.navLink);
      }

      if (this.props.activePath === this.childObj.navLink && !this.props.parentArr.includes(this.parentArray[0])) {
        this.props.parentArr.splice(0, this.props.parentArr.length);
        this.props.parentArr.push(this.parentArray);
      } else if (this.props.parentArr.includes(this.parentArray)) {
        this.props.parentArr.splice(0, this.props.parentArr.length);
      }
    }
  };

  _proto.renderChild = function renderChild(item, activeGroup, handleGroupClick, handleActiveItem, parent) {
    var _this2 = this;

    return /*#__PURE__*/React__default.createElement("ul", {
      className: "menu-content"
    }, item.children ? item.children.map(function (child) {
      var CustomAnchorTag = child.isExternalApp ? "a" : reactRouterDom.Link;

      if (!_this2.parentArray.includes(item.id) && _this2.flag) {
        _this2.parentArray.push(item.id);
      }

      if (child.navlink && child.collapsed) {
        _this2.props.collapsedMenuPaths(child.navLink);
      }

      if (_this2.props.activeItemState === child.navLink) {
        _this2.childObj = child;

        _this2.props.parentArr.push(_this2.parentArray);

        _this2.flag = false;
      }

      if (child.permissions && child.permissions.includes(_this2.props.currentUser) || child.permissions === undefined) {
        return /*#__PURE__*/React__default.createElement("li", {
          key: child.id,
          className: classnames({
            hover: _this2.props.hoverIndex === child.id,
            'has-sub': child.type === 'collapse',
            open: child.type === 'collapse' && activeGroup.includes(child.id),
            'sidebar-group-active': _this2.props.currentActiveGroup.includes(child.id),
            active: _this2.props.activeItemState === child.navLink && child.type === 'item' || item.parentOf && item.parentOf.includes(_this2.props.activeItemState),
            disabled: child.disabled
          }),
          onClick: function onClick(e) {
            e.stopPropagation();
            handleGroupClick(child.id, item.id, child.type);

            if (child.navLink && child.navLink !== undefined) {
              handleActiveItem(child.navLink);
            }

            if (_this2.props.deviceWidth <= 1200 && child.type === 'item') {
              _this2.props.toggleMenu();
            }
          }
        }, /*#__PURE__*/React__default.createElement(CustomAnchorTag, {
          className: classnames({
            'd-flex justify-content-between': child.type === 'collapse'
          }),
          to: child.navLink && child.type === 'item' ? child.navLink : '',
          href: _this2.props.getItemLink(child),
          onMouseEnter: function onMouseEnter() {
            _this2.props.handleSidebarMouseEnter(child.id);
          },
          onMouseLeave: function onMouseLeave() {
            _this2.props.handleSidebarMouseEnter(child.id);
          },
          key: child.id,
          onClick: function onClick(e) {
            return child.type === 'collapse' ? e.preventDefault() : '';
          },
          target: child.newTab ? '_blank' : undefined
        }, /*#__PURE__*/React__default.createElement("div", {
          className: "menu-text"
        }, child.icon, /*#__PURE__*/React__default.createElement("span", {
          className: "menu-item menu-title"
        }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
          id: child.title
        }))), child.badge ? /*#__PURE__*/React__default.createElement(reactstrap.Badge, {
          color: child.badge,
          className: "float-right mr-2",
          pill: true
        }, child.badgeText) : '', child.type === 'collapse' ? /*#__PURE__*/React__default.createElement(Icon.ChevronRight, {
          className: "menu-toggle-icon",
          size: 13
        }) : ''), child.children ? _this2.renderChild(child, activeGroup, handleGroupClick, handleActiveItem, item.id) : '');
      } else if (child.navLink === _this2.props.activePath && !child.permissions.includes(_this2.props.currentUser)) {
        return _this2.props.redirectUnauthorized();
      } else {
        return null;
      }
    }) : null);
  };

  _proto.render = function render() {
    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, this.renderChild(this.props.group, this.props.activeGroup, this.props.handleGroupClick, this.props.handleActiveItem, null));
  };

  return SideMenuGroup;
}(React__default.Component);

var SideMenuContent = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(SideMenuContent, _React$Component);

  function SideMenuContent(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      flag: true,
      isHovered: false,
      activeGroups: [],
      currentActiveGroup: [],
      tempArr: []
    };

    _this.handleGroupClick = function (id, parent, type) {
      if (parent === void 0) {
        parent = null;
      }

      if (type === void 0) {
        type = '';
      }

      var open_group = _this.state.activeGroups;
      var active_group = _this.state.currentActiveGroup;
      var temp_arr = _this.state.tempArr;

      if (type === 'item' && parent === null) {
        active_group = [];
        temp_arr = [];
      } else if (type === 'item' && parent !== null) {
        active_group = [];

        if (temp_arr.includes(parent)) {
          temp_arr.splice(temp_arr.indexOf(parent) + 1, temp_arr.length);
        } else {
          temp_arr = [];
          temp_arr.push(parent);
        }

        active_group = temp_arr.slice(0);
      } else if (type === 'collapse' && parent === null) {
        temp_arr = [];
        temp_arr.push(id);
      } else if (type === 'collapse' && parent !== null) {
        if (active_group.includes(parent)) {
          temp_arr = active_group.slice(0);
        }

        if (temp_arr.includes(id)) {
          temp_arr.splice(temp_arr.indexOf(id), temp_arr.length);
        } else {
          temp_arr.push(id);
        }
      } else {
        temp_arr = [];
      }

      if (type === 'collapse') {
        if (!open_group.includes(id)) {
          var temp = open_group.filter(function (obj) {
            return active_group.indexOf(obj) === -1;
          });

          if (temp.length > 0 && !open_group.includes(parent)) {
            open_group = open_group.filter(function (obj) {
              return !temp.includes(obj);
            });
          }

          if (open_group.includes(parent) && active_group.includes(parent)) {
            open_group = active_group.slice(0);
          }

          if (!open_group.includes(id)) {
            open_group.push(id);
          }
        } else {
          open_group.splice(open_group.indexOf(id), 1);
        }
      }

      if (type === 'item') {
        open_group = active_group.slice(0);
      }

      _this.setState({
        activeGroups: open_group,
        tempArr: temp_arr,
        currentActiveGroup: active_group
      });
    };

    _this.initRender = function (parentArr) {
      _this.setState({
        activeGroups: parentArr.slice(0),
        currentActiveGroup: parentArr.slice(0),
        flag: false
      });
    };

    _this.getItemLink = function (item) {
      return item.isExternalApp ? APP_URL + item.navLink + "?code=" + _this.props.currentUser.authToken : '';
    };

    _this.parentArr = [];
    _this.collapsedPath = null;
    return _this;
  }

  var _proto = SideMenuContent.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.initRender(this.parentArr[0] || []);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (prevProps.activePath !== this.props.activePath || prevProps.navConfigs !== this.props.navConfigs) {
      if (this.collapsedMenuPaths !== null) {
        this.props.collapsedMenuPaths(this.collapsedMenuPaths);
      }

      this.initRender(this.parentArr[0] ? this.parentArr[this.parentArr.length - 1] : []);
    }
  };

  _proto.render = function render() {
    var _this2 = this;

    var menuItems = this.props.navConfigs.map(function (item) {
      var CustomAnchorTag = item.isExternalApp ? "a" : reactRouterDom.Link;

      if (item.type === 'groupHeader') {
        return /*#__PURE__*/React__default.createElement("li", {
          className: "navigation-header",
          key: "group-header-" + item.groupTitle
        }, /*#__PURE__*/React__default.createElement("span", null, item.groupTitle));
      }

      var renderItem = /*#__PURE__*/React__default.createElement("li", {
        className: classnames('nav-item', {
          'has-sub': item.type === 'collapse',
          open: _this2.state.activeGroups.includes(item.id),
          'sidebar-group-active': _this2.state.currentActiveGroup.includes(item.id),
          hover: _this2.props.hoverIndex === item.id,
          active: _this2.props.activeItemState === item.navLink && item.type === 'item' || item.parentOf && item.parentOf.includes(_this2.props.activeItemState),
          disabled: item.disabled
        }),
        key: item.id,
        onClick: function onClick(e) {
          e.stopPropagation();

          if (item.type === 'item') {
            _this2.props.handleActiveItem(item.navLink);

            _this2.handleGroupClick(item.id, null, item.type);

            if (_this2.props.deviceWidth <= 1200 && item.type === 'item') {
              _this2.props.toggleMenu();
            }
          } else {
            _this2.handleGroupClick(item.id, null, item.type);
          }
        }
      }, /*#__PURE__*/React__default.createElement(CustomAnchorTag, {
        to: item.filterBase ? item.filterBase : item.navLink && item.type === 'item' ? item.navLink : '',
        href: _this2.getItemLink(item),
        className: "d-flex " + (item.badgeText ? 'justify-content-between' : 'justify-content-start'),
        onMouseEnter: function onMouseEnter() {
          _this2.props.handleSidebarMouseEnter(item.id);
        },
        onMouseLeave: function onMouseLeave() {
          _this2.props.handleSidebarMouseEnter(item.id);
        },
        key: item.id,
        onClick: function onClick(e) {
          return item.type === 'collapse' ? e.preventDefault() : '';
        },
        target: item.newTab ? '_blank' : undefined
      }, /*#__PURE__*/React__default.createElement("div", {
        className: "menu-text"
      }, item.icon, /*#__PURE__*/React__default.createElement("span", {
        className: "menu-item menu-title"
      }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: item.title
      }))), item.badge ? /*#__PURE__*/React__default.createElement("div", {
        className: "menu-badge"
      }, /*#__PURE__*/React__default.createElement(reactstrap.Badge, {
        color: item.badge,
        className: "mr-1",
        pill: true
      }, item.badgeText)) : '', item.type === 'collapse' ? /*#__PURE__*/React__default.createElement(Icon.ChevronRight, {
        className: "menu-toggle-icon",
        size: 13
      }) : ''), item.type === 'collapse' ? /*#__PURE__*/React__default.createElement(SideMenuGroup, {
        group: item,
        handleGroupClick: _this2.handleGroupClick,
        activeGroup: _this2.state.activeGroups,
        handleActiveItem: _this2.props.handleActiveItem,
        activeItemState: _this2.props.activeItemState,
        handleSidebarMouseEnter: _this2.props.handleSidebarMouseEnter,
        activePath: _this2.props.activePath,
        hoverIndex: _this2.props.hoverIndex,
        initRender: _this2.initRender,
        parentArr: _this2.parentArr,
        triggerActive: undefined,
        currentActiveGroup: _this2.state.currentActiveGroup,
        getItemLink: _this2.getItemLink,
        permission: _this2.props.permission,
        currentUser: _this2.props.currentUser,
        redirectUnauthorized: _this2.redirectUnauthorized,
        collapsedMenuPaths: _this2.props.collapsedMenuPaths,
        toggleMenu: _this2.props.toggleMenu,
        deviceWidth: _this2.props.deviceWidth
      }) : '');

      if (item.navLink && item.collapsed !== undefined && item.collapsed === true) {
        _this2.collapsedPath = item.navLink;

        _this2.props.collapsedMenuPaths(item.navLink);
      }

      if (item.type === 'collapse' || item.type === 'external-link' || item.type === 'item' && item.permissions && item.permissions.includes(_this2.props.currentUser.role) || item.permissions === undefined) {
        return renderItem;
      } else if (item.type === 'item' && item.navLink === _this2.props.activePath && !item.permissions.includes(_this2.props.currentUser.role)) {
        return _this2.redirectUnauthorized();
      }
    });
    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, menuItems);
  };

  return SideMenuContent;
}(React__default.Component);

var Sidebar = /*#__PURE__*/function (_Component) {
  _inheritsLoose(Sidebar, _Component);

  function Sidebar() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      width: window.innerWidth,
      activeIndex: null,
      hoveredMenuItem: null,
      activeItem: _this.props.activePath,
      menuShadow: false,
      ScrollbarTag: PerfectScrollbar
    };
    _this.mounted = false;

    _this.updateWidth = function () {
      if (_this.mounted) {
        _this.setState(function (prevState) {
          return {
            width: window.innerWidth
          };
        });

        _this.checkDevice();
      }
    };

    _this.checkDevice = function () {
      var prefixes = " -webkit- -moz- -o- -ms- ".split(" ");

      var mq = function mq(query) {
        return window.matchMedia(query).matches;
      };

      if ("ontouchstart" in window || window.DocumentTouch) {
        _this.setState({
          ScrollbarTag: "div"
        });
      } else {
        _this.setState({
          ScrollbarTag: PerfectScrollbar
        });
      }

      var query = ["(", prefixes.join("touch-enabled),("), "heartz", ")"].join("");
      return mq(query);
    };

    _this.changeActiveIndex = function (id) {
      if (id !== _this.state.activeIndex) {
        _this.setState({
          activeIndex: id
        });
      } else {
        _this.setState({
          activeIndex: null
        });
      }
    };

    _this.handleSidebarMouseEnter = function (id) {
      if (id !== _this.state.hoveredMenuItem) {
        _this.setState({
          hoveredMenuItem: id
        });
      } else {
        _this.setState({
          hoveredMenuItem: null
        });
      }
    };

    _this.handleActiveItem = function (url) {
      _this.setState({
        activeItem: url
      });
    };

    return _this;
  }

  Sidebar.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
    if (props.activePath !== state.activeItem) {
      return {
        activeItem: props.activePath
      };
    }

    return null;
  };

  var _proto = Sidebar.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.mounted = true;

    if (this.mounted) {
      if (window !== "undefined") {
        window.addEventListener("resize", this.updateWidth, false);
      }

      this.checkDevice();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.mounted = false;
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        toggleSidebarMenu = _this$props.toggleSidebarMenu,
        visibilityState = _this$props.visibilityState,
        sidebarHover = _this$props.sidebarHover,
        toggle = _this$props.toggle,
        color = _this$props.color,
        sidebarVisibility = _this$props.sidebarVisibility,
        activeTheme = _this$props.activeTheme,
        collapsed = _this$props.collapsed,
        activePath = _this$props.activePath,
        sidebarState = _this$props.sidebarState,
        currentLang = _this$props.currentLang,
        permission = _this$props.permission,
        currentUser = _this$props.currentUser,
        collapsedMenuPaths = _this$props.collapsedMenuPaths;
    var _this$state = this.state,
        menuShadow = _this$state.menuShadow,
        activeIndex = _this$state.activeIndex,
        hoveredMenuItem = _this$state.hoveredMenuItem,
        activeItem = _this$state.activeItem,
        ScrollbarTag = _this$state.ScrollbarTag;

    var scrollShadow = function scrollShadow(container, dir) {
      if (container && dir === "up" && container.scrollTop >= 100) {
        _this2.setState({
          menuShadow: true
        });
      } else if (container && dir === "down" && container.scrollTop < 100) {
        _this2.setState({
          menuShadow: false
        });
      } else {
        return;
      }
    };

    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(Hammer, {
      onSwipe: function onSwipe(e) {
        sidebarVisibility();
      }
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "menu-swipe-area d-xl-none d-block vh-100"
    })), /*#__PURE__*/React__default.createElement("div", {
      className: classnames("main-menu menu-fixed menu-light menu-accordion menu-shadow theme-" + activeTheme, {
        collapsed: sidebarState === true,
        "hide-sidebar": this.state.width < 1200 && visibilityState === false
      }),
      onMouseEnter: function onMouseEnter() {
        return sidebarHover(false);
      },
      onMouseLeave: function onMouseLeave() {
        return sidebarHover(true);
      }
    }, /*#__PURE__*/React__default.createElement(SidebarHeader, {
      toggleSidebarMenu: toggleSidebarMenu,
      toggle: toggle,
      sidebarBgColor: color,
      sidebarVisibility: sidebarVisibility,
      activeTheme: activeTheme,
      collapsed: collapsed,
      menuShadow: menuShadow,
      activePath: activePath,
      sidebarState: sidebarState
    }), /*#__PURE__*/React__default.createElement(ScrollbarTag, _extends({
      className: classnames("main-menu-content", {
        "overflow-hidden": ScrollbarTag !== "div",
        "overflow-scroll": ScrollbarTag === "div"
      })
    }, ScrollbarTag !== "div" && {
      options: {
        wheelPropagation: false
      },
      onScrollDown: function onScrollDown(container) {
        return scrollShadow(container, "down");
      },
      onScrollUp: function onScrollUp(container) {
        return scrollShadow(container, "up");
      },
      onYReachStart: function onYReachStart() {
        return menuShadow === true && _this2.setState({
          menuShadow: false
        });
      }
    }), /*#__PURE__*/React__default.createElement(Hammer, {
      onSwipe: function onSwipe() {
        sidebarVisibility();
      }
    }, /*#__PURE__*/React__default.createElement("ul", {
      className: "navigation navigation-main"
    }, /*#__PURE__*/React__default.createElement(SideMenuContent, {
      setActiveIndex: this.changeActiveIndex,
      activeIndex: activeIndex,
      hoverIndex: hoveredMenuItem,
      handleSidebarMouseEnter: this.handleSidebarMouseEnter,
      activeItemState: activeItem,
      handleActiveItem: this.handleActiveItem,
      activePath: activePath,
      lang: currentLang,
      permission: permission,
      currentUser: currentUser,
      collapsedMenuPaths: collapsedMenuPaths,
      toggleMenu: sidebarVisibility,
      deviceWidth: this.props.deviceWidth,
      navConfigs: this.props.navConfigs
    }))))));
  };

  return Sidebar;
}(React.Component);

var mapStateToProps$1 = function mapStateToProps(state) {
  return {
    currentUser: state.auth,
    navConfigs: state.navbar.navConfigs
  };
};

var Sidebar$1 = reactRedux.connect(mapStateToProps$1)(Sidebar);

var Layout = /*#__PURE__*/function (_PureComponent) {
  _inheritsLoose(Layout, _PureComponent);

  function Layout() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;
    _this.state = {
      width: window.innerWidth,
      sidebarState: _this.props.customizer.sidebarCollapsed,
      layout: _this.props.customizer.theme,
      collapsedContent: _this.props.customizer.sidebarCollapsed,
      sidebarHidden: false,
      currentLang: 'en',
      appOverlay: false,
      customizer: false,
      currRoute: ''
    };
    _this.collapsedPaths = [];
    _this.mounted = false;

    _this.updateWidth = function () {
      if (_this.mounted) {
        _this.setState(function (prevState) {
          return {
            width: window.innerWidth
          };
        });
      }
    };

    _this.handleCustomizer = function (bool) {
      _this.setState({
        customizer: bool
      });
    };

    _this.handleCollapsedMenuPaths = function (item) {
      var collapsedPaths = _this.collapsedPaths;

      if (!collapsedPaths.includes(item)) {
        collapsedPaths.push(item);
        _this.collapsedPaths = collapsedPaths;
      }
    };

    _this.toggleSidebarMenu = function (val) {
      _this.setState({
        sidebarState: !_this.state.sidebarState,
        collapsedContent: !_this.state.collapsedContent
      });
    };

    _this.sidebarMenuHover = function (val) {
      _this.setState({
        sidebarState: val
      });
    };

    _this.handleSidebarVisibility = function () {
      if (_this.mounted) {
        if (window !== undefined) {
          window.addEventListener('resize', function () {
            if (_this.state.sidebarHidden) {
              _this.setState({
                sidebarHidden: !_this.state.sidebarHidden
              });
            }
          });
        }

        _this.setState({
          sidebarHidden: !_this.state.sidebarHidden
        });
      }
    };

    _this.handleCurrentLanguage = function (lang) {
      _this.setState({
        currentLang: lang
      });
    };

    _this.handleAppOverlay = function (value) {
      if (value.length > 0) {
        _this.setState({
          appOverlay: true
        });
      } else if (value.length < 0 || value === '') {
        _this.setState({
          appOverlay: false
        });
      }
    };

    _this.handleAppOverlayClick = function () {
      _this.setState({
        appOverlay: false
      });
    };

    return _this;
  }

  var _proto = Layout.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.mounted = true;
    var _this$props = this.props,
        pathname = _this$props.location.pathname,
        _this$props$customize = _this$props.customizer,
        theme = _this$props$customize.theme,
        direction = _this$props$customize.direction;

    if (this.mounted) {
      if (window !== 'undefined') {
        window.addEventListener('resize', this.updateWidth, false);
      }

      if (this.collapsedPaths.includes(pathname)) {
        this.props.collapseSidebar(true);
      }

      var layout = theme;
      var dir = direction;
      if (dir === 'rtl') document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');else document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
      return layout === 'dark' ? document.body.classList.add('dark-layout') : layout === 'semi-dark' ? document.body.classList.add('semi-dark-layout') : null;
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var _this$props2 = this.props,
        pathname = _this$props2.location.pathname,
        _this$props2$customiz = _this$props2.customizer,
        theme = _this$props2$customiz.theme,
        sidebarCollapsed = _this$props2$customiz.sidebarCollapsed;
    var layout = theme;

    if (this.mounted) {
      if (layout === 'dark') {
        document.body.classList.remove('semi-dark-layout');
        document.body.classList.add('dark-layout');
      }

      if (layout === 'semi-dark') {
        document.body.classList.remove('dark-layout');
        document.body.classList.add('semi-dark-layout');
      }

      if (layout !== 'dark' && layout !== 'semi-dark') {
        document.body.classList.remove('dark-layout', 'semi-dark-layout');
      }

      if (prevProps.customizer.sidebarCollapsed !== this.props.customizer.sidebarCollapsed) {
        this.setState({
          collapsedContent: sidebarCollapsed,
          sidebarState: sidebarCollapsed
        });
      }

      if (prevProps.customizer.sidebarCollapsed === this.props.customizer.sidebarCollapsed && pathname !== prevProps.location.pathname && this.collapsedPaths.includes(pathname)) {
        this.props.collapseSidebar(true);
      }

      if (prevProps.customizer.sidebarCollapsed === this.props.customizer.sidebarCollapsed && pathname !== prevProps.location.pathname && !this.collapsedPaths.includes(pathname)) {
        this.props.collapseSidebar(false);
      }
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.mounted = false;
  };

  _proto.render = function render() {
    var appProps = this.props.customizer;
    var menuThemeArr = ['primary', 'success', 'danger', 'info', 'warning', 'dark'];
    var sidebarProps = {
      toggleSidebarMenu: this.props.collapseSidebar,
      toggle: this.toggleSidebarMenu,
      sidebarState: this.state.sidebarState,
      sidebarHover: this.sidebarMenuHover,
      sidebarVisibility: this.handleSidebarVisibility,
      visibilityState: this.state.sidebarHidden,
      activePath: this.props.location.pathname,
      collapsedMenuPaths: this.handleCollapsedMenuPaths,
      currentLang: this.state.currentLang,
      activeTheme: appProps.menuTheme,
      collapsed: this.state.collapsedContent,
      permission: '',
      deviceWidth: this.state.width
    };
    var navbarProps = {
      toggleSidebarMenu: this.toggleSidebarMenu,
      sidebarState: this.state.sidebarState,
      sidebarVisibility: this.handleSidebarVisibility,
      currentLang: this.state.currentLang,
      changeCurrentLang: this.handleCurrentLanguage,
      handleAppOverlay: this.handleAppOverlay,
      appOverlayState: this.state.appOverlay,
      navbarColor: appProps.navbarColor,
      navbarType: appProps.navbarType
    };
    var footerProps = {
      footerType: appProps.footerType,
      hideScrollToTop: appProps.hideScrollToTop
    };
    return /*#__PURE__*/React__default.createElement("div", {
      className: classnames("wrapper vertical-layout theme-" + appProps.menuTheme, {
        'menu-collapsed': this.state.collapsedContent === true && this.state.width >= 1200,
        'fixed-footer': appProps.footerType === 'sticky',
        'navbar-static': appProps.navbarType === 'static',
        'navbar-sticky': appProps.navbarType === 'sticky',
        'navbar-floating': appProps.navbarType === 'floating',
        'navbar-hidden': appProps.navbarType === 'hidden',
        'theme-primary': !menuThemeArr.includes(appProps.menuTheme)
      })
    }, /*#__PURE__*/React__default.createElement(Sidebar$1, sidebarProps), /*#__PURE__*/React__default.createElement("div", {
      className: classnames('app-content content', {
        'show-overlay': this.state.appOverlay === true
      }),
      onClick: this.handleAppOverlayClick
    }, /*#__PURE__*/React__default.createElement(PerfectScrollbar, null, /*#__PURE__*/React__default.createElement(Navbar, navbarProps), /*#__PURE__*/React__default.createElement("div", {
      className: "content-wrapper"
    }, this.props.children))), /*#__PURE__*/React__default.createElement(Footer, footerProps), /*#__PURE__*/React__default.createElement("div", {
      className: "sidenav-overlay",
      onClick: this.handleSidebarVisibility
    }));
  };

  return Layout;
}(React.PureComponent);

var mapStateToProps$2 = function mapStateToProps(state) {
  return {
    customizer: state.customizer
  };
};

var Layout$1 = reactRedux.connect(mapStateToProps$2, {
  changeMode: changeMode,
  collapseSidebar: collapseSidebar,
  changeNavbarColor: changeNavbarColor,
  changeNavbarType: changeNavbarType,
  changeFooterType: changeFooterType,
  changeMenuColor: changeMenuColor,
  hideScrollToTop: hideScrollToTop
})(Layout);

var LOAD_NATIVGATION$1 = 'LOAD_NATIVGATION';
var loadNavtigation = function loadNavtigation(appId) {
  return function (dispatch) {
    try {
      var _temp2 = _catch(function () {
        return Promise.resolve(NavBarService.getNativagtion()).then(function (res) {
          var roles = res.data;
          var navConfigs = getNativgationConfig(appId, roles);
          dispatch({
            type: LOAD_NATIVGATION$1,
            payload: {
              navConfigs: navConfigs,
              roles: roles
            }
          });
        });
      }, function () {
        dispatch({
          type: LOAD_NATIVGATION$1,
          payload: {
            navConfigs: getNativgationConfig(appId),
            roles: []
          }
        });
      });

      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
};

var Context = React__default.createContext();

var IntlProviderWrapper = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(IntlProviderWrapper, _React$Component);

  function IntlProviderWrapper() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      locale: 'vi',
      messages: _this.props.appMessage['vi']
    };
    return _this;
  }

  var _proto = IntlProviderWrapper.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var children = this.props.children;
    var _this$state = this.state,
        locale = _this$state.locale,
        messages = _this$state.messages;
    return /*#__PURE__*/React__default.createElement(Context.Provider, {
      value: {
        state: this.state,
        switchLanguage: function switchLanguage(language) {
          _this2.setState({
            locale: language,
            messages: _this2.props.appMessage[language]
          });
        }
      }
    }, /*#__PURE__*/React__default.createElement(reactIntl.IntlProvider, {
      key: locale,
      locale: locale,
      messages: messages,
      defaultLocale: "vi"
    }, children));
  };

  return IntlProviderWrapper;
}(React__default.Component);

var login = "Login";
var register = "Register";
var forgotPassword = "Forgot password";
var setting = "Setting";
var messages_en = {
	login: login,
	"login.firstWelcome": "Welcome you to InOn X!",
	"login.logedWelcome": "Hi,",
	"login.username": "Username *",
	"login.username.required": "You must enter your username",
	"login.password": "Password *",
	"login.password.required": "You must enter your password",
	"login.rememberMe": "Remember me",
	"login.fail": "Username or password was incorrect",
	register: register,
	"register.fullname": "Full name *",
	"register.fullname.required": "You must enter your full name",
	"register.email.required": "You must enter your email address",
	"register.email.invalid": "You must enter your valid email address",
	"register.phoneNumber": "Phone mumber *",
	"register.phoneNumber.invalid": "You must enter your valid phone number",
	"register.phoneNumber.required": "You must enter your phone number",
	"register.referalCode": "Referal code",
	"register.mustAppcepted": "Your must accept our terms and conditions",
	forgotPassword: forgotPassword,
	"forgotPassword.verify": "Verify",
	"forgotPassword.username": "Username *",
	"forgotPassword.username.required": "You must enter username",
	"forgotPassword.email": "Email registration *",
	"forgotPassword.email.required": "You must enter email registration",
	"menu.home": "Home",
	"menu.user": "User Management",
	"menu.buyInsurance": "Buy Insurance",
	"menu.contractManagement": "Contract Management",
	"menu.personalContracts": "Personal Contracts",
	"menu.partnerContracts": "Parnter Contracts",
	"menu.allContracts": "All Contracts",
	"menu.account": "Account",
	"menu.createAccount": "Create Account",
	"menu.accountManagement": "Account Management",
	"menu.insuranceFeeManagement": "Insurance Fee",
	"menu.systemFee": "System Fee",
	"menu.personalFee": "Personal Fee",
	"menu.partnerFee": "Partner Fee",
	"menu.allFee": "All Fee",
	"menu.bonusManagement": "Bonus Mangement",
	"menu.systemBonus": "System Bonus",
	"menu.personalBonus": "Personal Bonus",
	"menu.partnerBonus": "Partner Bonus",
	"menu.allBonus": "All Bonus",
	"menu.insuranceCertificate": "Insurance Certification",
	"menu.insuranceCertificate.newImport": "New Import",
	"menu.insuranceCertificate.newExport": "New Export",
	"menu.insuranceCertificate.wrongImport": "Wrong Import",
	"menu.insuranceCertificate.wrongExport": "Wrong Export",
	"menu.debt": "Debt",
	"menu.createDebt": "Create Debt",
	"menu.debtManagement": "Debt Management",
	"menu.permissionGoup": "Permission Group",
	"menu.creatPermissionGoup": "Create Permision Group",
	"menu.permissionGoupManagement": "Permission Group Management",
	"navbar.language.vi": "Vietnamese",
	"navbar.language.en": "English",
	"navbar.logout": "Logout",
	"footer.copyRight": "© 2020 InOn-All rights reserved",
	"footer.companySlogan": "Leading insurance provider in Vietnam",
	setting: setting,
	"setting.accountInformation": "Account Information",
	"setting.changePassword": "Change password",
	"setting.partnerCode": "Partner code",
	"setting.referralCode": "Referral code",
	"setting.personalSetting": "Personal Settings",
	"setting.generalInformation": "General Information",
	"setting.notification": "Notification",
	"setting.deviceManagement": "Device Management",
	"setting.language": "Language",
	"setting.termAndCondition": "Terms & condition",
	"setting.general": "General",
	"setting.privacyPolicy": "Privacy Policy",
	"setting.frequentlyAsked": "Frequently Asked",
	"setting.contact": "Contact InOn",
	"setting.feedback": "Feedback",
	"setting.share": "Share",
	"setting.status.COMPLETE": "Your account had completed information",
	"setting.status.UNCOMPLETE": "Account need additional information",
	"setting.gender.M": "Male",
	"setting.gender.F": "FeMale",
	"setting.gender.O": "Others",
	"changePassword.passwordMustMatch": "Password must match"
};

var login$1 = "Đăng nhập";
var register$1 = "Đăng ký";
var forgotPassword$1 = "Quên mật khẩu";
var setting$1 = "Cài đặt";
var messages_vi = {
	login: login$1,
	"login.firstWelcome": "Chào mừng bạn đến với InOn X!",
	"login.logedWelcome": "Xin chào,",
	"login.username": "Tên tài khoản *",
	"login.username.required": "Bạn phải nhập tên tài khoản",
	"login.password": "Mật khẩu *",
	"login.password.required": "Bạn phải nhập mật khẩu",
	"login.rememberMe": "Ghi nhớ tôi",
	"login.fail": "Tài khoản hoặc mật khẩu của bạn không chính xác",
	register: register$1,
	"register.fullname": "Họ và tên *",
	"register.fullname.required": "Bạn phải nhập họ và tên",
	"register.email.required": "Bạn phải nhập địa chỉ email",
	"register.email.invalid": "Địa chỉ email không hợp lệ",
	"register.phoneNumber": "Số điện thoại *",
	"register.phoneNumber.required": "Bạn phải nhập số điện thoại",
	"register.phoneNumber.invalid": "Số điện thoại không hợp lệ",
	"register.referalCode": "Mã giới thiệu",
	"register.mustAppcepted": "Bạn phải đồng ý điều khoản và điều kiện của chúng tôi",
	forgotPassword: forgotPassword$1,
	"forgotPassword.verify": "Xác thực",
	"forgotPassword.username": "Tên tài khoản *",
	"forgotPassword.username.required": "Bạn phải nhập tên tài khoản",
	"forgotPassword.email": "Email đăng ký *",
	"forgotPassword.email.required": "Bạn phải nhập email đăng ký",
	"menu.home": "Trang chủ",
	"menu.user": "Tài khoản",
	"menu.buyInsurance": "Mua bảo hiểm",
	"menu.contractManagement": "Quản lý hợp đồng",
	"menu.personalContracts": "Hợp đồng cá nhân",
	"menu.partnerContracts": "Hợp đồng đối tác",
	"menu.allContracts": "Tất cả hợp đồng",
	"menu.account": "Tài khoản",
	"menu.createAccount": "Tạo mới tài khoản",
	"menu.accountManagement": "Quản lý tài khoản",
	"menu.insuranceFeeManagement": "Quản lý Tỷ lệ phí",
	"menu.systemFee": "Phí của hệ thống",
	"menu.personalFee": "Phí của cá nhân",
	"menu.partnerFee": "Phí của đối tác",
	"menu.allFee": "Phí của tất cả",
	"menu.bonusManagement": "Quản lý điểm thưởng",
	"menu.systemBonus": "Điểm thưởng hệ thống",
	"menu.personalBonus": "Điểm thưởng cá nhân",
	"menu.partnerBonus": "Điểm thưởng đối tác",
	"menu.allBonus": "Điểm thưởng tất cả",
	"menu.insuranceCertificate": "Giấy chứng nhân BH",
	"menu.insuranceCertificate.newImport": "Nhập mới",
	"menu.insuranceCertificate.newExport": "Xuất mới",
	"menu.insuranceCertificate.wrongImport": "Nhập sai hỏng",
	"menu.insuranceCertificate.wrongExport": "Xuất sai hỏng",
	"menu.debt": "Công nợ",
	"menu.createDebt": "Tạo mới công nợ",
	"menu.debtManagement": "Quản lý công nợ",
	"menu.permissionGoup": "Nhóm quyền",
	"menu.creatPermissionGoup": "Tạo mới nhóm quyền",
	"menu.permissionGoupManagement": "Quản lý nhóm quyền",
	"navbar.language.vi": "Tiếng Việt",
	"navbar.language.en": "Tiếng Anh",
	"navbar.logout": "Đăng xuất",
	"footer.copyRight": "©2020 InOn-Đã đăng ký bản quyền",
	"footer.companySlogan": "Nhà cung cấp bảo hiểm hàng đầu Việt Nam",
	setting: setting$1,
	"setting.accountInformation": "Thông tin tài khoản",
	"setting.changePassword": "Thay đổi mật khẩu",
	"setting.partnerCode": "Mã đối tác",
	"setting.referralCode": "Mã giới thiệu",
	"setting.personalSetting": "Cài đặt Cá nhân",
	"setting.generalInformation": "Thông tin chung",
	"setting.notification": "Thông báo",
	"setting.deviceManagement": "Quản lý thiết bị",
	"setting.language": "Ngôn ngữ",
	"setting.termAndCondition": "Điều khoản & Điều kiện",
	"setting.general": "Chung",
	"setting.privacyPolicy": "Chính sách bảo mật",
	"setting.frequentlyAsked": "Câu hỏi thường gặp",
	"setting.contact": "Liên hệ InOn",
	"setting.feedback": "Góp ý, báo lỗi",
	"setting.share": "Chia sẻ",
	"setting.status.COMPLETE": "Tài khoản đã hoàn thiện thông tin",
	"setting.status.UNCOMPLE": "Tài khoản cần bổ sung thông tin",
	"setting.gender.M": "Name",
	"setting.gender.F": "Nữ",
	"setting.gender.O": "Khác",
	"changePassword.passwordMustMatch": "Mật khẩu không trùng khớp"
};

var CheckBox = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(CheckBox, _React$Component);

  function CheckBox() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = CheckBox.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/React__default.createElement("div", {
      className: "vx-checkbox-con " + (this.props.className ? this.props.className : '') + " vx-checkbox-" + this.props.color
    }, /*#__PURE__*/React__default.createElement("input", {
      type: "checkbox",
      defaultChecked: this.props.defaultChecked,
      checked: this.props.checked,
      value: this.props.value,
      disabled: this.props.disabled,
      onClick: this.props.onClick ? this.props.onClick : null,
      onChange: this.props.onChange ? this.props.onChange : null
    }), /*#__PURE__*/React__default.createElement("span", {
      className: "vx-checkbox vx-checkbox-" + (this.props.size ? this.props.size : 'md')
    }, /*#__PURE__*/React__default.createElement("span", {
      className: "vx-checkbox--check"
    }, this.props.icon)), /*#__PURE__*/React__default.createElement("span", null, this.props.label));
  };

  return CheckBox;
}(React__default.Component);

var UserAccountTab = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(UserAccountTab, _React$Component);

  function UserAccountTab() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = UserAccountTab.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/React__default.createElement(reactstrap.Row, null, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "12"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      className: "mb-2"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      className: "mr-2 my-25",
      left: true,
      href: "#"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      className: "users-avatar-shadow rounded",
      object: true,
      src: 'https://storage.live.com/Users/-6155523327610065665/MyProfile/ExpressionProfile/ProfilePhoto:Win8Static,UserTileMedium,UserTileStatic',
      alt: "user profile image",
      height: "84",
      width: "84"
    })), /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      className: "mt-2",
      body: true
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      className: "font-medium-1 text-bold-600",
      tag: "p",
      heading: true
    }, "Crystal Hamilton"), /*#__PURE__*/React__default.createElement("div", {
      className: "d-flex flex-wrap"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Button.Ripple, {
      className: "mr-1",
      color: "primary",
      outline: true
    }, "Change"), /*#__PURE__*/React__default.createElement(reactstrap.Button.Ripple, {
      color: "flat-danger"
    }, "Remove Avatar"))))), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "12"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Form, {
      onSubmit: function onSubmit(e) {
        return e.preventDefault();
      }
    }, /*#__PURE__*/React__default.createElement(reactstrap.Row, null, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      md: "6",
      sm: "12"
    }, /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      "for": "username"
    }, "Username"), /*#__PURE__*/React__default.createElement(reactstrap.Input, {
      type: "text",
      defaultValue: "crystal",
      id: "username",
      placeholder: "Username"
    }))), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      md: "6",
      sm: "12"
    }, /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      "for": "status"
    }, "Status"), /*#__PURE__*/React__default.createElement(reactstrap.Input, {
      type: "select",
      name: "status",
      id: "status"
    }, /*#__PURE__*/React__default.createElement("option", null, "Active"), /*#__PURE__*/React__default.createElement("option", null, "Banned"), /*#__PURE__*/React__default.createElement("option", null, "Closed")))), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      md: "6",
      sm: "12"
    }, /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      "for": "name"
    }, "Name"), /*#__PURE__*/React__default.createElement(reactstrap.Input, {
      type: "text",
      defaultValue: "Crystal Hamilton",
      id: "name",
      placeholder: "Name"
    }))), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      md: "6",
      sm: "12"
    }, /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      "for": "role"
    }, "Role"), /*#__PURE__*/React__default.createElement(reactstrap.Input, {
      type: "select",
      name: "role",
      id: "role"
    }, /*#__PURE__*/React__default.createElement("option", null, "User"), /*#__PURE__*/React__default.createElement("option", null, "Staff")))), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      md: "6",
      sm: "12"
    }, /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      "for": "email"
    }, "Email"), /*#__PURE__*/React__default.createElement(reactstrap.Input, {
      type: "text",
      defaultValue: "crystalhamilton@gmail.com",
      id: "email",
      placeholder: "Email"
    }))), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      md: "6",
      sm: "12"
    }, /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      "for": "company"
    }, "Company"), /*#__PURE__*/React__default.createElement(reactstrap.Input, {
      type: "text",
      id: "company",
      defaultValue: "North Star Aviation Pvt Ltd",
      placeholder: "company"
    }))), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "12"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "permissions border px-2"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "title pt-2 pb-0"
    }, /*#__PURE__*/React__default.createElement(Icon.Lock, {
      size: 19
    }), /*#__PURE__*/React__default.createElement("span", {
      className: "text-bold-500 font-medium-2 ml-50"
    }, "Permissions"), /*#__PURE__*/React__default.createElement("hr", null)), /*#__PURE__*/React__default.createElement(reactstrap.Table, {
      borderless: true,
      responsive: true
    }, /*#__PURE__*/React__default.createElement("thead", null, /*#__PURE__*/React__default.createElement("tr", null, /*#__PURE__*/React__default.createElement("th", null, "Module Permission"), /*#__PURE__*/React__default.createElement("th", null, "Read"), /*#__PURE__*/React__default.createElement("th", null, "Write"), /*#__PURE__*/React__default.createElement("th", null, "Create"), /*#__PURE__*/React__default.createElement("th", null, "Delete"))), /*#__PURE__*/React__default.createElement("tbody", null, /*#__PURE__*/React__default.createElement("tr", null, /*#__PURE__*/React__default.createElement("td", null, "Users"), /*#__PURE__*/React__default.createElement("td", null, /*#__PURE__*/React__default.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React__default.createElement(Icon.Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: true
    })), /*#__PURE__*/React__default.createElement("td", null, /*#__PURE__*/React__default.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React__default.createElement(Icon.Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: false
    })), /*#__PURE__*/React__default.createElement("td", null, /*#__PURE__*/React__default.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React__default.createElement(Icon.Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: false
    })), /*#__PURE__*/React__default.createElement("td", null, ' ', /*#__PURE__*/React__default.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React__default.createElement(Icon.Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: true
    }))), /*#__PURE__*/React__default.createElement("tr", null, /*#__PURE__*/React__default.createElement("td", null, "Articles"), /*#__PURE__*/React__default.createElement("td", null, /*#__PURE__*/React__default.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React__default.createElement(Icon.Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: false
    })), /*#__PURE__*/React__default.createElement("td", null, /*#__PURE__*/React__default.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React__default.createElement(Icon.Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: true
    })), /*#__PURE__*/React__default.createElement("td", null, /*#__PURE__*/React__default.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React__default.createElement(Icon.Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: false
    })), /*#__PURE__*/React__default.createElement("td", null, ' ', /*#__PURE__*/React__default.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React__default.createElement(Icon.Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: true
    }))), /*#__PURE__*/React__default.createElement("tr", null, /*#__PURE__*/React__default.createElement("td", null, "Staff"), /*#__PURE__*/React__default.createElement("td", null, /*#__PURE__*/React__default.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React__default.createElement(Icon.Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: true
    })), /*#__PURE__*/React__default.createElement("td", null, /*#__PURE__*/React__default.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React__default.createElement(Icon.Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: true
    })), /*#__PURE__*/React__default.createElement("td", null, /*#__PURE__*/React__default.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React__default.createElement(Icon.Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: false
    })), /*#__PURE__*/React__default.createElement("td", null, ' ', /*#__PURE__*/React__default.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React__default.createElement(Icon.Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: false
    }))))))), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      className: "d-flex justify-content-end flex-wrap mt-2",
      sm: "12"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Button.Ripple, {
      className: "mr-1",
      color: "primary"
    }, "Save Changes"), /*#__PURE__*/React__default.createElement(reactstrap.Button.Ripple, {
      color: "flat-warning"
    }, "Reset"))))));
  };

  return UserAccountTab;
}(React__default.Component);

var Radio = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Radio, _React$Component);

  function Radio() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Radio.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/React__default.createElement("div", {
      className: classnames("vx-radio-con " + this.props.className + " vx-radio-" + this.props.color)
    }, /*#__PURE__*/React__default.createElement("input", {
      type: "radio",
      defaultChecked: this.props.defaultChecked,
      value: this.props.value,
      disabled: this.props.disabled,
      name: this.props.name,
      onClick: this.props.onClick,
      onChange: this.props.onChange,
      ref: this.props.ref,
      checked: this.props.checked
    }), /*#__PURE__*/React__default.createElement("span", {
      className: classnames("vx-radio", {
        "vx-radio-sm": this.props.size === "sm",
        "vx-radio-lg": this.props.size === "lg"
      })
    }, /*#__PURE__*/React__default.createElement("span", {
      className: "vx-radio--border"
    }), /*#__PURE__*/React__default.createElement("span", {
      className: "vx-radio--circle"
    })), /*#__PURE__*/React__default.createElement("span", null, this.props.label));
  };

  return Radio;
}(React__default.Component);

var languages = [{
  value: 'english',
  label: 'English',
  color: '#7367f0'
}, {
  value: 'french',
  label: 'French',
  color: '#7367f0'
}, {
  value: 'spanish',
  label: 'Spanish',
  color: '#7367f0'
}, {
  value: 'russian',
  label: 'Russian',
  color: '#7367f0'
}, {
  value: 'italian',
  label: 'Italian',
  color: '#7367f0'
}];
var colourStyles = {
  control: function control(styles) {
    return _extends({}, styles, {
      backgroundColor: 'white'
    });
  },
  option: function option(styles, _ref) {
    var data = _ref.data,
        isDisabled = _ref.isDisabled,
        isFocused = _ref.isFocused,
        isSelected = _ref.isSelected;
    var color = data.color ? chroma(data.color) : '#7367f0';
    return _extends({}, styles, {
      backgroundColor: isDisabled ? null : isSelected ? data.color : isFocused ? color.alpha(0.1).css() : null,
      color: isDisabled ? '#ccc' : isSelected ? chroma.contrast(color, 'white') > 2 ? 'white' : 'black' : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',
      ':active': _extends({}, styles[':active'], {
        backgroundColor: !isDisabled && (isSelected ? data.color : '#7367f0')
      })
    });
  },
  multiValue: function multiValue(styles, _ref2) {
    var data = _ref2.data;
    var color = data.color ? chroma(data.color) : '#7367f0';
    return _extends({}, styles, {
      backgroundColor: color.alpha(0.1).css()
    });
  },
  multiValueLabel: function multiValueLabel(styles, _ref3) {
    var data = _ref3.data;
    return _extends({}, styles, {
      color: data.color ? data.color : '#7367f0'
    });
  },
  multiValueRemove: function multiValueRemove(styles, _ref4) {
    var data = _ref4.data;
    return _extends({}, styles, {
      color: data.color,
      ':hover': {
        backgroundColor: data.color ? data.color : '#7367f0',
        color: 'white'
      }
    });
  }
};

var UserInfoTab = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(UserInfoTab, _React$Component);

  function UserInfoTab() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      dob: new Date('1995-05-22')
    };

    _this.handledob = function (date) {
      _this.setState({
        dob: date
      });
    };

    return _this;
  }

  var _proto = UserInfoTab.prototype;

  _proto.render = function render() {
    var _this2 = this;

    return /*#__PURE__*/React__default.createElement(reactstrap.Form, {
      onSubmit: function onSubmit(e) {
        return e.preventDefault();
      }
    }, /*#__PURE__*/React__default.createElement(reactstrap.Row, {
      className: "mt-1"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      className: "mt-1",
      md: "6",
      sm: "12"
    }, /*#__PURE__*/React__default.createElement("h5", {
      className: "mb-1"
    }, /*#__PURE__*/React__default.createElement(Icon.User, {
      className: "mr-50",
      size: 16
    }), /*#__PURE__*/React__default.createElement("span", {
      className: "align-middle"
    }, "Personal Info")), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      className: "d-block",
      "for": "dob"
    }, "Date of birth"), /*#__PURE__*/React__default.createElement(Flatpickr, {
      id: "dob",
      className: "form-control",
      options: {
        dateFormat: 'Y-m-d'
      },
      value: this.state.dob,
      onChange: function onChange(date) {
        return _this2.handledob(date);
      }
    })), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      "for": "contactnumber"
    }, "Contact Number"), /*#__PURE__*/React__default.createElement(reactstrap.Input, {
      type: "number",
      id: "contactnumber",
      placeholder: "Contact Number"
    })), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      "for": "website"
    }, "Website"), /*#__PURE__*/React__default.createElement(reactstrap.Input, {
      type: "url",
      id: "website",
      placeholder: "Web Address"
    })), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      "for": "languages"
    }, "Languages"), /*#__PURE__*/React__default.createElement(Select$1, {
      isMulti: true,
      defaultValue: [languages[0], languages[1], languages[2]],
      isClearable: true,
      styles: colourStyles,
      options: languages,
      className: "React",
      classNamePrefix: "select",
      id: "languages"
    })), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      className: "d-block mb-50"
    }, "Gender"), /*#__PURE__*/React__default.createElement("div", {
      className: "d-inline-block mr-1"
    }, /*#__PURE__*/React__default.createElement(Radio, {
      label: "Male",
      color: "primary",
      defaultChecked: false,
      name: "gender"
    })), /*#__PURE__*/React__default.createElement("div", {
      className: "d-inline-block mr-1"
    }, /*#__PURE__*/React__default.createElement(Radio, {
      label: "Female",
      color: "primary",
      defaultChecked: true,
      name: "gender"
    })), /*#__PURE__*/React__default.createElement("div", {
      className: "d-inline-block"
    }, /*#__PURE__*/React__default.createElement(Radio, {
      label: "Others",
      color: "primary",
      defaultChecked: false,
      name: "gender"
    }))), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      className: "d-block mb-50",
      "for": "communication"
    }, "Communication"), /*#__PURE__*/React__default.createElement("div", {
      className: "d-inline-block mr-1"
    }, /*#__PURE__*/React__default.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React__default.createElement(Icon.Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "Email",
      defaultChecked: false
    })), /*#__PURE__*/React__default.createElement("div", {
      className: "d-inline-block mr-1"
    }, /*#__PURE__*/React__default.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React__default.createElement(Icon.Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "SMS",
      defaultChecked: false
    })), /*#__PURE__*/React__default.createElement("div", {
      className: "d-inline-block"
    }, /*#__PURE__*/React__default.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React__default.createElement(Icon.Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "Phone",
      defaultChecked: false
    })))), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      className: "mt-1",
      md: "6",
      sm: "12"
    }, /*#__PURE__*/React__default.createElement("h5", {
      className: "mb-1"
    }, /*#__PURE__*/React__default.createElement(Icon.MapPin, {
      className: "mr-50",
      size: 16
    }), /*#__PURE__*/React__default.createElement("span", {
      className: "align-middle"
    }, "Address")), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      "for": "address1"
    }, "Address Line 1"), /*#__PURE__*/React__default.createElement(reactstrap.Input, {
      type: "text",
      id: "address1",
      placeholder: "Last Name Here"
    })), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      "for": "address1"
    }, "Address Line 2"), /*#__PURE__*/React__default.createElement(reactstrap.Input, {
      type: "text",
      id: "address1",
      placeholder: "Address Line 2"
    })), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      "for": "pincode"
    }, "Pincode"), /*#__PURE__*/React__default.createElement(reactstrap.Input, {
      type: "text",
      id: "pincode",
      placeholder: "Pincode"
    })), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      "for": "city"
    }, "City"), /*#__PURE__*/React__default.createElement(reactstrap.Input, {
      type: "text",
      defaultValue: "Camden Town",
      id: "city",
      placeholder: "City"
    })), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      "for": "State"
    }, "State"), /*#__PURE__*/React__default.createElement(reactstrap.Input, {
      type: "text",
      defaultValue: "London",
      id: "State",
      placeholder: "State"
    })), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      "for": "Country"
    }, "Country"), /*#__PURE__*/React__default.createElement(reactstrap.Input, {
      type: "text",
      defaultValue: "UK",
      id: "Country",
      placeholder: "Country"
    }))), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      className: "d-flex justify-content-end flex-wrap",
      sm: "12"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Button.Ripple, {
      className: "mr-1",
      color: "primary"
    }, "Save Changes"), /*#__PURE__*/React__default.createElement(reactstrap.Button.Ripple, {
      color: "flat-warning"
    }, "Reset"))));
  };

  return UserInfoTab;
}(React__default.Component);

var AccountSettings = function AccountSettings(props) {
  var _useState = React.useState('account-info'),
      activeTab = _useState[0],
      setActiveTab = _useState[1];

  React.useEffect(function () {
    return setActiveTab(props.activeTab);
  }, [props.activeTab]);
  return /*#__PURE__*/React__default.createElement(reactstrap.Row, null, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
    sm: "12"
  }, /*#__PURE__*/React__default.createElement(reactstrap.Card, null, /*#__PURE__*/React__default.createElement(reactstrap.CardHeader, null, /*#__PURE__*/React__default.createElement(reactstrap.CardTitle, null, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: 'setting.personalSetting'
  }))), /*#__PURE__*/React__default.createElement(reactstrap.CardBody, {
    className: "pt-2"
  }, /*#__PURE__*/React__default.createElement(reactstrap.Nav, {
    tabs: true
  }, /*#__PURE__*/React__default.createElement(reactstrap.NavItem, null, /*#__PURE__*/React__default.createElement(reactstrap.NavLink, {
    className: classnames({
      active: activeTab === 'account-info'
    }),
    onClick: function onClick() {
      setActiveTab('account-info');
    }
  }, /*#__PURE__*/React__default.createElement(Icon.User, {
    size: 16
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "align-middle ml-50"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "setting.accountInformation"
  })))), /*#__PURE__*/React__default.createElement(reactstrap.NavItem, null, /*#__PURE__*/React__default.createElement(reactstrap.NavLink, {
    className: classnames({
      active: activeTab === 'change-password'
    }),
    onClick: function onClick() {
      setActiveTab('change-password');
    }
  }, /*#__PURE__*/React__default.createElement(Icon.Info, {
    size: 16
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "align-middle ml-50"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "setting.changePassword"
  }))))), /*#__PURE__*/React__default.createElement(reactstrap.TabContent, {
    activeTab: activeTab
  }, /*#__PURE__*/React__default.createElement(reactstrap.TabPane, {
    tabId: "account-info"
  }, /*#__PURE__*/React__default.createElement(UserAccountTab, null)), /*#__PURE__*/React__default.createElement(reactstrap.TabPane, {
    tabId: "change-password"
  }, /*#__PURE__*/React__default.createElement(UserInfoTab, null)))))));
};

var UserAccountTab$1 = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(UserAccountTab, _React$Component);

  function UserAccountTab() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = UserAccountTab.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/React__default.createElement(reactstrap.Row, null, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "12"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      className: "mb-2"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      className: "mr-2 my-25",
      left: true,
      href: "#"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      className: "users-avatar-shadow rounded",
      object: true,
      src: 'https://storage.live.com/Users/-6155523327610065665/MyProfile/ExpressionProfile/ProfilePhoto:Win8Static,UserTileMedium,UserTileStatic',
      alt: "user profile image",
      height: "84",
      width: "84"
    })), /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      className: "mt-2",
      body: true
    }, /*#__PURE__*/React__default.createElement(reactstrap.Media, {
      className: "font-medium-1 text-bold-600",
      tag: "p",
      heading: true
    }, "Crystal Hamilton"), /*#__PURE__*/React__default.createElement("div", {
      className: "d-flex flex-wrap"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Button.Ripple, {
      className: "mr-1",
      color: "primary",
      outline: true
    }, "Change"), /*#__PURE__*/React__default.createElement(reactstrap.Button.Ripple, {
      color: "flat-danger"
    }, "Remove Avatar"))))), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "12"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Form, {
      onSubmit: function onSubmit(e) {
        return e.preventDefault();
      }
    }, /*#__PURE__*/React__default.createElement(reactstrap.Row, null, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      md: "6",
      sm: "12"
    }, /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      "for": "username"
    }, "Username"), /*#__PURE__*/React__default.createElement(reactstrap.Input, {
      type: "text",
      defaultValue: "crystal",
      id: "username",
      placeholder: "Username"
    }))), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      md: "6",
      sm: "12"
    }, /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      "for": "status"
    }, "Status"), /*#__PURE__*/React__default.createElement(reactstrap.Input, {
      type: "select",
      name: "status",
      id: "status"
    }, /*#__PURE__*/React__default.createElement("option", null, "Active"), /*#__PURE__*/React__default.createElement("option", null, "Banned"), /*#__PURE__*/React__default.createElement("option", null, "Closed")))), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      md: "6",
      sm: "12"
    }, /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      "for": "name"
    }, "Name"), /*#__PURE__*/React__default.createElement(reactstrap.Input, {
      type: "text",
      defaultValue: "Crystal Hamilton",
      id: "name",
      placeholder: "Name"
    }))), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      md: "6",
      sm: "12"
    }, /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      "for": "role"
    }, "Role"), /*#__PURE__*/React__default.createElement(reactstrap.Input, {
      type: "select",
      name: "role",
      id: "role"
    }, /*#__PURE__*/React__default.createElement("option", null, "User"), /*#__PURE__*/React__default.createElement("option", null, "Staff")))), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      md: "6",
      sm: "12"
    }, /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      "for": "email"
    }, "Email"), /*#__PURE__*/React__default.createElement(reactstrap.Input, {
      type: "text",
      defaultValue: "crystalhamilton@gmail.com",
      id: "email",
      placeholder: "Email"
    }))), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      md: "6",
      sm: "12"
    }, /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      "for": "company"
    }, "Company"), /*#__PURE__*/React__default.createElement(reactstrap.Input, {
      type: "text",
      id: "company",
      defaultValue: "North Star Aviation Pvt Ltd",
      placeholder: "company"
    }))), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "12"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "permissions border px-2"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "title pt-2 pb-0"
    }, /*#__PURE__*/React__default.createElement(Icon.Lock, {
      size: 19
    }), /*#__PURE__*/React__default.createElement("span", {
      className: "text-bold-500 font-medium-2 ml-50"
    }, "Permissions"), /*#__PURE__*/React__default.createElement("hr", null)), /*#__PURE__*/React__default.createElement(reactstrap.Table, {
      borderless: true,
      responsive: true
    }, /*#__PURE__*/React__default.createElement("thead", null, /*#__PURE__*/React__default.createElement("tr", null, /*#__PURE__*/React__default.createElement("th", null, "Module Permission"), /*#__PURE__*/React__default.createElement("th", null, "Read"), /*#__PURE__*/React__default.createElement("th", null, "Write"), /*#__PURE__*/React__default.createElement("th", null, "Create"), /*#__PURE__*/React__default.createElement("th", null, "Delete"))), /*#__PURE__*/React__default.createElement("tbody", null, /*#__PURE__*/React__default.createElement("tr", null, /*#__PURE__*/React__default.createElement("td", null, "Users"), /*#__PURE__*/React__default.createElement("td", null, /*#__PURE__*/React__default.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React__default.createElement(Icon.Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: true
    })), /*#__PURE__*/React__default.createElement("td", null, /*#__PURE__*/React__default.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React__default.createElement(Icon.Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: false
    })), /*#__PURE__*/React__default.createElement("td", null, /*#__PURE__*/React__default.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React__default.createElement(Icon.Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: false
    })), /*#__PURE__*/React__default.createElement("td", null, ' ', /*#__PURE__*/React__default.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React__default.createElement(Icon.Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: true
    }))), /*#__PURE__*/React__default.createElement("tr", null, /*#__PURE__*/React__default.createElement("td", null, "Articles"), /*#__PURE__*/React__default.createElement("td", null, /*#__PURE__*/React__default.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React__default.createElement(Icon.Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: false
    })), /*#__PURE__*/React__default.createElement("td", null, /*#__PURE__*/React__default.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React__default.createElement(Icon.Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: true
    })), /*#__PURE__*/React__default.createElement("td", null, /*#__PURE__*/React__default.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React__default.createElement(Icon.Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: false
    })), /*#__PURE__*/React__default.createElement("td", null, ' ', /*#__PURE__*/React__default.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React__default.createElement(Icon.Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: true
    }))), /*#__PURE__*/React__default.createElement("tr", null, /*#__PURE__*/React__default.createElement("td", null, "Staff"), /*#__PURE__*/React__default.createElement("td", null, /*#__PURE__*/React__default.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React__default.createElement(Icon.Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: true
    })), /*#__PURE__*/React__default.createElement("td", null, /*#__PURE__*/React__default.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React__default.createElement(Icon.Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: true
    })), /*#__PURE__*/React__default.createElement("td", null, /*#__PURE__*/React__default.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React__default.createElement(Icon.Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: false
    })), /*#__PURE__*/React__default.createElement("td", null, ' ', /*#__PURE__*/React__default.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React__default.createElement(Icon.Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: false
    }))))))), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      className: "d-flex justify-content-end flex-wrap mt-2",
      sm: "12"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Button.Ripple, {
      className: "mr-1",
      color: "primary"
    }, "Save Changes"), /*#__PURE__*/React__default.createElement(reactstrap.Button.Ripple, {
      color: "flat-warning"
    }, "Reset"))))));
  };

  return UserAccountTab;
}(React__default.Component);

var languages$1 = [{
  value: 'english',
  label: 'English',
  color: '#7367f0'
}, {
  value: 'french',
  label: 'French',
  color: '#7367f0'
}, {
  value: 'spanish',
  label: 'Spanish',
  color: '#7367f0'
}, {
  value: 'russian',
  label: 'Russian',
  color: '#7367f0'
}, {
  value: 'italian',
  label: 'Italian',
  color: '#7367f0'
}];
var colourStyles$1 = {
  control: function control(styles) {
    return _extends({}, styles, {
      backgroundColor: 'white'
    });
  },
  option: function option(styles, _ref) {
    var data = _ref.data,
        isDisabled = _ref.isDisabled,
        isFocused = _ref.isFocused,
        isSelected = _ref.isSelected;
    var color = data.color ? chroma(data.color) : '#7367f0';
    return _extends({}, styles, {
      backgroundColor: isDisabled ? null : isSelected ? data.color : isFocused ? color.alpha(0.1).css() : null,
      color: isDisabled ? '#ccc' : isSelected ? chroma.contrast(color, 'white') > 2 ? 'white' : 'black' : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',
      ':active': _extends({}, styles[':active'], {
        backgroundColor: !isDisabled && (isSelected ? data.color : '#7367f0')
      })
    });
  },
  multiValue: function multiValue(styles, _ref2) {
    var data = _ref2.data;
    var color = data.color ? chroma(data.color) : '#7367f0';
    return _extends({}, styles, {
      backgroundColor: color.alpha(0.1).css()
    });
  },
  multiValueLabel: function multiValueLabel(styles, _ref3) {
    var data = _ref3.data;
    return _extends({}, styles, {
      color: data.color ? data.color : '#7367f0'
    });
  },
  multiValueRemove: function multiValueRemove(styles, _ref4) {
    var data = _ref4.data;
    return _extends({}, styles, {
      color: data.color,
      ':hover': {
        backgroundColor: data.color ? data.color : '#7367f0',
        color: 'white'
      }
    });
  }
};

var UserInfoTab$1 = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(UserInfoTab, _React$Component);

  function UserInfoTab() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      dob: new Date('1995-05-22')
    };

    _this.handledob = function (date) {
      _this.setState({
        dob: date
      });
    };

    return _this;
  }

  var _proto = UserInfoTab.prototype;

  _proto.render = function render() {
    var _this2 = this;

    return /*#__PURE__*/React__default.createElement(reactstrap.Form, {
      onSubmit: function onSubmit(e) {
        return e.preventDefault();
      }
    }, /*#__PURE__*/React__default.createElement(reactstrap.Row, {
      className: "mt-1"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      className: "mt-1",
      md: "6",
      sm: "12"
    }, /*#__PURE__*/React__default.createElement("h5", {
      className: "mb-1"
    }, /*#__PURE__*/React__default.createElement(Icon.User, {
      className: "mr-50",
      size: 16
    }), /*#__PURE__*/React__default.createElement("span", {
      className: "align-middle"
    }, "Personal Info")), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      className: "d-block",
      "for": "dob"
    }, "Date of birth"), /*#__PURE__*/React__default.createElement(Flatpickr, {
      id: "dob",
      className: "form-control",
      options: {
        dateFormat: 'Y-m-d'
      },
      value: this.state.dob,
      onChange: function onChange(date) {
        return _this2.handledob(date);
      }
    })), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      "for": "contactnumber"
    }, "Contact Number"), /*#__PURE__*/React__default.createElement(reactstrap.Input, {
      type: "number",
      id: "contactnumber",
      placeholder: "Contact Number"
    })), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      "for": "website"
    }, "Website"), /*#__PURE__*/React__default.createElement(reactstrap.Input, {
      type: "url",
      id: "website",
      placeholder: "Web Address"
    })), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      "for": "languages"
    }, "Languages"), /*#__PURE__*/React__default.createElement(Select$1, {
      isMulti: true,
      defaultValue: [languages$1[0], languages$1[1], languages$1[2]],
      isClearable: true,
      styles: colourStyles$1,
      options: languages$1,
      className: "React",
      classNamePrefix: "select",
      id: "languages"
    })), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      className: "d-block mb-50"
    }, "Gender"), /*#__PURE__*/React__default.createElement("div", {
      className: "d-inline-block mr-1"
    }, /*#__PURE__*/React__default.createElement(Radio, {
      label: "Male",
      color: "primary",
      defaultChecked: false,
      name: "gender"
    })), /*#__PURE__*/React__default.createElement("div", {
      className: "d-inline-block mr-1"
    }, /*#__PURE__*/React__default.createElement(Radio, {
      label: "Female",
      color: "primary",
      defaultChecked: true,
      name: "gender"
    })), /*#__PURE__*/React__default.createElement("div", {
      className: "d-inline-block"
    }, /*#__PURE__*/React__default.createElement(Radio, {
      label: "Others",
      color: "primary",
      defaultChecked: false,
      name: "gender"
    }))), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      className: "d-block mb-50",
      "for": "communication"
    }, "Communication"), /*#__PURE__*/React__default.createElement("div", {
      className: "d-inline-block mr-1"
    }, /*#__PURE__*/React__default.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React__default.createElement(Icon.Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "Email",
      defaultChecked: false
    })), /*#__PURE__*/React__default.createElement("div", {
      className: "d-inline-block mr-1"
    }, /*#__PURE__*/React__default.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React__default.createElement(Icon.Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "SMS",
      defaultChecked: false
    })), /*#__PURE__*/React__default.createElement("div", {
      className: "d-inline-block"
    }, /*#__PURE__*/React__default.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React__default.createElement(Icon.Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "Phone",
      defaultChecked: false
    })))), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      className: "mt-1",
      md: "6",
      sm: "12"
    }, /*#__PURE__*/React__default.createElement("h5", {
      className: "mb-1"
    }, /*#__PURE__*/React__default.createElement(Icon.MapPin, {
      className: "mr-50",
      size: 16
    }), /*#__PURE__*/React__default.createElement("span", {
      className: "align-middle"
    }, "Address")), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      "for": "address1"
    }, "Address Line 1"), /*#__PURE__*/React__default.createElement(reactstrap.Input, {
      type: "text",
      id: "address1",
      placeholder: "Last Name Here"
    })), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      "for": "address1"
    }, "Address Line 2"), /*#__PURE__*/React__default.createElement(reactstrap.Input, {
      type: "text",
      id: "address1",
      placeholder: "Address Line 2"
    })), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      "for": "pincode"
    }, "Pincode"), /*#__PURE__*/React__default.createElement(reactstrap.Input, {
      type: "text",
      id: "pincode",
      placeholder: "Pincode"
    })), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      "for": "city"
    }, "City"), /*#__PURE__*/React__default.createElement(reactstrap.Input, {
      type: "text",
      defaultValue: "Camden Town",
      id: "city",
      placeholder: "City"
    })), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      "for": "State"
    }, "State"), /*#__PURE__*/React__default.createElement(reactstrap.Input, {
      type: "text",
      defaultValue: "London",
      id: "State",
      placeholder: "State"
    })), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      "for": "Country"
    }, "Country"), /*#__PURE__*/React__default.createElement(reactstrap.Input, {
      type: "text",
      defaultValue: "UK",
      id: "Country",
      placeholder: "Country"
    }))), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      className: "d-flex justify-content-end flex-wrap",
      sm: "12"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Button.Ripple, {
      className: "mr-1",
      color: "primary"
    }, "Save Changes"), /*#__PURE__*/React__default.createElement(reactstrap.Button.Ripple, {
      color: "flat-warning"
    }, "Reset"))));
  };

  return UserInfoTab;
}(React__default.Component);

var GeneralInfo = function GeneralInfo(props) {
  var _useState = React.useState('terms-and-condition'),
      activeTab = _useState[0],
      setActiveTab = _useState[1];

  React.useEffect(function () {
    return setActiveTab(props.activeTab);
  }, [props.activeTab]);
  return /*#__PURE__*/React__default.createElement(reactstrap.Row, null, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
    sm: "12"
  }, /*#__PURE__*/React__default.createElement(reactstrap.Card, null, /*#__PURE__*/React__default.createElement(reactstrap.CardHeader, null, /*#__PURE__*/React__default.createElement(reactstrap.CardTitle, null, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: 'setting.generalInformation'
  }))), /*#__PURE__*/React__default.createElement(reactstrap.CardBody, {
    className: "pt-2"
  }, /*#__PURE__*/React__default.createElement(reactstrap.Nav, {
    tabs: true
  }, /*#__PURE__*/React__default.createElement(reactstrap.NavItem, null, /*#__PURE__*/React__default.createElement(reactstrap.NavLink, {
    className: classnames({
      active: activeTab === 'terms-and-condition'
    }),
    onClick: function onClick() {
      setActiveTab('terms-and-condition');
    }
  }, /*#__PURE__*/React__default.createElement(Icon.User, {
    size: 16
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "align-middle ml-50"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "setting.accountInformation"
  })))), /*#__PURE__*/React__default.createElement(reactstrap.NavItem, null, /*#__PURE__*/React__default.createElement(reactstrap.NavLink, {
    className: classnames({
      active: activeTab === 'privacy-policy'
    }),
    onClick: function onClick() {
      setActiveTab('privacy-policy');
    }
  }, /*#__PURE__*/React__default.createElement(Icon.Info, {
    size: 16
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "align-middle ml-50"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "setting.changePassword"
  })))), /*#__PURE__*/React__default.createElement(reactstrap.NavItem, null, /*#__PURE__*/React__default.createElement(reactstrap.NavLink, {
    className: classnames({
      active: activeTab === 'language'
    }),
    onClick: function onClick() {
      setActiveTab('language');
    }
  }, /*#__PURE__*/React__default.createElement(Icon.User, {
    size: 16
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "align-middle ml-50"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "setting.accountInformation"
  })))), /*#__PURE__*/React__default.createElement(reactstrap.NavItem, null, /*#__PURE__*/React__default.createElement(reactstrap.NavLink, {
    className: classnames({
      active: activeTab === 'contact'
    }),
    onClick: function onClick() {
      setActiveTab('contact');
    }
  }, /*#__PURE__*/React__default.createElement(Icon.Info, {
    size: 16
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "align-middle ml-50"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "setting.changePassword"
  }))))), /*#__PURE__*/React__default.createElement(reactstrap.TabContent, {
    activeTab: activeTab
  }, /*#__PURE__*/React__default.createElement(reactstrap.TabPane, {
    tabId: "terms-and-condition"
  }, /*#__PURE__*/React__default.createElement(UserAccountTab$1, null)), /*#__PURE__*/React__default.createElement(reactstrap.TabPane, {
    tabId: "privacy-policy"
  }, /*#__PURE__*/React__default.createElement(UserInfoTab$1, null)), /*#__PURE__*/React__default.createElement(reactstrap.TabPane, {
    tabId: "language"
  }, /*#__PURE__*/React__default.createElement(UserAccountTab$1, null)), /*#__PURE__*/React__default.createElement(reactstrap.TabPane, {
    tabId: "contact"
  }, /*#__PURE__*/React__default.createElement(UserInfoTab$1, null)))))));
};

var formSchema = Yup.object().shape({
  username: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "login.username.required"
  })),
  password: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "login.password.required"
  }))
});

var Login = function Login() {
  var _useState = React.useState(false),
      rememberMe = _useState[0],
      setRememberMe = _useState[1];

  var dispatch = reactRedux.useDispatch();
  var loginStatus = reactRedux.useSelector(function (state) {
    return state.auth.loginStatus;
  });

  var onSubmit = function onSubmit(values, actions) {
    dispatch(loginAction({
      username: values.username,
      password: values.password,
      rememberMe: rememberMe
    }));
    actions.setSubmitting(false);
  };

  return /*#__PURE__*/React__default.createElement(formik.Formik, {
    initialValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      referalCode: ''
    },
    onSubmit: onSubmit,
    validationSchema: formSchema
  }, function (_ref) {
    var errors = _ref.errors,
        touched = _ref.touched;
    return /*#__PURE__*/React__default.createElement(formik.Form, null, /*#__PURE__*/React__default.createElement("h4", {
      className: "text-center text-white"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "login.firstWelcome"
    }), loginStatus === LOGIN_STATUS.FAIL ? /*#__PURE__*/React__default.createElement("div", {
      className: "text-danger mt-1"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "login.fail"
    })) : ''), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, {
      className: "form-label-group position-relative mt-3"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "login.username"
    }, function (msg) {
      return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(formik.Field, {
        name: "username",
        className: "form-control " + (errors.username && touched.username && 'is-invalid'),
        placeholder: msg
      }), errors.username && touched.username ? /*#__PURE__*/React__default.createElement("div", {
        className: "text-danger"
      }, errors.username) : null, /*#__PURE__*/React__default.createElement(reactstrap.Label, null, msg));
    })), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, {
      className: "form-label-group position-relative"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "login.password"
    }, function (msg) {
      return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(formik.FastField, {
        name: "password"
      }, function (_ref2) {
        var field = _ref2.field,
            form = _ref2.form;
        return /*#__PURE__*/React__default.createElement(reactstrap.Input, _extends({
          type: "password",
          className: "form-control " + (errors.password && touched.password && 'is-invalid'),
          placeholder: msg
        }, field, {
          onChange: function onChange(e) {
            return form.setFieldValue('password', e.target.value);
          }
        }));
      }), errors.password && touched.password ? /*#__PURE__*/React__default.createElement("div", {
        className: "text-danger"
      }, errors.password) : null, /*#__PURE__*/React__default.createElement(reactstrap.Label, null, msg));
    })), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, {
      className: "d-flex justify-content-between align-items-center"
    }, /*#__PURE__*/React__default.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React__default.createElement(Icon.Check, {
        className: "vx-icon",
        size: 16
      }),
      label: /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "login.rememberMe"
      }),
      onChange: function onChange(e) {
        return setRememberMe(e.target.checked);
      },
      defaultChecked: rememberMe
    }), /*#__PURE__*/React__default.createElement("div", {
      className: "divider",
      style: {
        height: '30px'
      }
    }), /*#__PURE__*/React__default.createElement("div", {
      className: "float-right"
    }, /*#__PURE__*/React__default.createElement(reactRouterDom.Link, {
      to: "/forgot-password",
      className: "text-white"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "forgotPassword"
    })))), /*#__PURE__*/React__default.createElement("div", {
      className: "d-flex justify-content-center"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Button, {
      color: "primary",
      type: "submit"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "login"
    }))));
  });
};

var phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
var formSchema$1 = Yup.object().shape({
  fullName: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "register.fullname.required"
  })),
  email: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "register.email.required"
  })).email( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "register.email.invalid"
  })),
  phoneNumber: Yup.string().matches(phoneRegExp, function () {
    return /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "register.phoneNumber.invalid"
    });
  }).required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "register.phoneNumber.required"
  }))
});

var Register = function Register() {
  var _useState = React.useState(false),
      isAppcepted = _useState[0],
      setIsAppcepted = _useState[1];

  var _useState2 = React.useState(false),
      isNotApccepted = _useState2[0],
      setIsNotAccepted = _useState2[1];

  var onSubmit = function onSubmit(values, actions) {
    setTimeout(function () {
      if (!isAppcepted) {
        setIsNotAccepted(true);
        return;
      }

      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    }, 1000);
  };

  var ontoggleAccepted = function ontoggleAccepted(checked) {
    setIsAppcepted(checked);
    setIsNotAccepted(!checked);
  };

  return /*#__PURE__*/React__default.createElement(formik.Formik, {
    initialValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      referalCode: ''
    },
    onSubmit: onSubmit,
    validationSchema: formSchema$1
  }, function (_ref) {
    var errors = _ref.errors,
        touched = _ref.touched;
    return /*#__PURE__*/React__default.createElement(formik.Form, null, /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, {
      className: "form-label-group position-relative"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "register.fullname"
    }, function (msg) {
      return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(formik.Field, {
        name: "fullName",
        className: "form-control " + (errors.fullName && touched.fullName && 'is-invalid'),
        placeholder: msg
      }), errors.fullName && touched.fullName ? /*#__PURE__*/React__default.createElement("div", {
        className: "text-danger"
      }, errors.fullName) : null, /*#__PURE__*/React__default.createElement(reactstrap.Label, null, msg));
    })), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, {
      className: "form-label-group position-relative"
    }, /*#__PURE__*/React__default.createElement(formik.Field, {
      name: "email",
      className: "form-control " + (errors.email && touched.email && 'is-invalid'),
      placeholder: "Email *"
    }), errors.email && touched.email ? /*#__PURE__*/React__default.createElement("div", {
      className: "text-danger"
    }, errors.email) : null, /*#__PURE__*/React__default.createElement(reactstrap.Label, null, "Email *")), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, {
      className: "form-label-group position-relative"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "register.phoneNumber"
    }, function (msg) {
      return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(formik.Field, {
        name: "phoneNumber",
        className: "form-control " + (errors.phoneNumber && touched.phoneNumber && 'is-invalid'),
        placeholder: msg
      }), errors.phoneNumber && touched.phoneNumber ? /*#__PURE__*/React__default.createElement("div", {
        className: "text-danger"
      }, errors.phoneNumber) : null, /*#__PURE__*/React__default.createElement(reactstrap.Label, null, msg));
    })), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, {
      className: "form-label-group position-relative"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "register.referalCode"
    }, function (msg) {
      return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(formik.Field, {
        name: "referalCode",
        className: "form-control",
        placeholder: msg
      }), /*#__PURE__*/React__default.createElement(reactstrap.Label, null, msg));
    })), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement("div", {
      className: "d-flex align-items-center"
    }, /*#__PURE__*/React__default.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React__default.createElement(Icon.Check, {
        className: "vx-icon",
        size: 16
      }),
      onChange: function onChange(e) {
        return ontoggleAccepted(e.target.checked);
      },
      defaultChecked: isAppcepted
    }), /*#__PURE__*/React__default.createElement("div", null, "T\xF4i \u0111\u1ED3ng \xFD v\u1EDBi", ' ', /*#__PURE__*/React__default.createElement("a", {
      className: "text-primary"
    }, "\u0110i\u1EC1u kho\u1EA3n v\xE0 \u0110i\u1EC1u ki\u1EC7n"), " s\u1EED d\u1EE5ng d\u1ECBch v\u1EE5.")), isNotApccepted ? /*#__PURE__*/React__default.createElement("div", {
      className: "text-danger"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "register.mustAppcepted"
    })) : null, /*#__PURE__*/React__default.createElement("div", {
      className: "d-flex justify-content-center mt-2"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Button, {
      color: "primary",
      type: "submit"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "register"
    })))));
  });
};

var formSchema$2 = Yup.object().shape({
  username: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "forgotPassword.username.required"
  })),
  email: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "forgotPassword.email.required"
  })).email( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "register.email.invalid"
  }))
});

var ForgotPassword = function ForgotPassword() {
  var onSubmit = function onSubmit(values, actions) {
    actions.setSubmitting(false);
  };

  var onClickSuggestion = function onClickSuggestion() {};

  return /*#__PURE__*/React__default.createElement(formik.Formik, {
    initialValues: {
      username: '',
      email: ''
    },
    onSubmit: onSubmit,
    validationSchema: formSchema$2
  }, function (_ref) {
    var errors = _ref.errors,
        touched = _ref.touched;
    return /*#__PURE__*/React__default.createElement(formik.Form, null, /*#__PURE__*/React__default.createElement("h4", {
      className: "text-center text-white"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "forgotPassword"
    })), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, {
      className: "form-label-group position-relative mt-3"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "forgotPassword.username"
    }, function (msg) {
      return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(formik.Field, {
        name: "username",
        className: "form-control " + (errors.username && touched.username && 'is-invalid'),
        placeholder: msg
      }), errors.username && touched.username ? /*#__PURE__*/React__default.createElement("div", {
        className: "text-danger"
      }, errors.username) : null, /*#__PURE__*/React__default.createElement(reactstrap.Label, null, msg));
    })), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, {
      className: "form-label-group position-relative"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "forgotPassword.email"
    }, function (msg) {
      return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(formik.FastField, {
        name: "email"
      }, function (_ref2) {
        var field = _ref2.field,
            form = _ref2.form;
        return /*#__PURE__*/React__default.createElement(reactstrap.Input, _extends({
          className: "" + (errors.email && touched.email && 'is-invalid not-show-icon'),
          placeholder: msg
        }, field, {
          onChange: function onChange(e) {
            return form.setFieldValue('email', e.target.value);
          }
        }));
      }), errors.email && touched.email ? /*#__PURE__*/React__default.createElement("div", {
        className: "text-danger"
      }, errors.email) : null, /*#__PURE__*/React__default.createElement("div", {
        className: "form-control-position text-primary cursor-pointer",
        onClick: onClickSuggestion
      }, /*#__PURE__*/React__default.createElement(Icon.Sun, {
        size: 15
      })), /*#__PURE__*/React__default.createElement(reactstrap.Label, null, msg));
    })), /*#__PURE__*/React__default.createElement("div", {
      className: "d-flex justify-content-center"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Button, {
      color: "primary",
      type: "submit"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "forgotPassword.verify"
    }))));
  });
};

var LandingPage = function LandingPage(props) {
  var _useState = React.useState(''),
      activeTab = _useState[0],
      setActiveTab = _useState[1];

  var history = reactRouterDom.useHistory();
  React.useEffect(function () {
    setActiveTab(props.activeTab || 'login');
  }, [props.activeTab]);

  var TabView = function TabView() {
    switch (activeTab) {
      case 'login':
        return /*#__PURE__*/React__default.createElement(Login, null);

      case 'register':
        return /*#__PURE__*/React__default.createElement(Register, null);

      case 'forgot-password':
        return /*#__PURE__*/React__default.createElement(ForgotPassword, null);

      default:
        return '';
    }
  };

  var goToLink = function goToLink(link) {
    return history.push(link);
  };

  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: "landing-page",
    style: {
      background: "url('" + IMAGE.LANDING_PAGE_BG + "')"
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "ld-main ml-auto col-12 col-md-6 col-lg-4"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "ld-header d-flex justify-content-between mb-5"
  }, /*#__PURE__*/React__default.createElement(Context.Consumer, null, function (context) {
    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("img", {
      src: IMAGE.LOGO_WHITE,
      alt: "logo"
    }), /*#__PURE__*/React__default.createElement("div", {
      className: "languages d-flex align-items-center"
    }, /*#__PURE__*/React__default.createElement("div", {
      onClick: function onClick() {
        return context.switchLanguage('vi');
      },
      className: classnames('mr-1 cursor-pointer', {
        'text-primary': context.state.locale === 'vi'
      })
    }, "VIE"), /*#__PURE__*/React__default.createElement("div", {
      className: "divider mr-1",
      style: {
        height: '15px'
      }
    }), /*#__PURE__*/React__default.createElement("div", {
      onClick: function onClick() {
        return context.switchLanguage('en');
      },
      className: classnames('mr-1 cursor-pointer', {
        'text-primary': context.state.locale === 'en'
      })
    }, "ENG")));
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "lg-content-header d-flex cursor-pointer"
  }, /*#__PURE__*/React__default.createElement("div", {
    onClick: function onClick() {
      return goToLink('/login');
    },
    className: classnames('col-6 text-center tab-control', {
      active: activeTab === 'login'
    })
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "login"
  })), /*#__PURE__*/React__default.createElement("div", {
    onClick: function onClick() {
      return goToLink('/register');
    },
    className: classnames('col-6 text-center tab-control', {
      active: activeTab === 'register'
    })
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "register"
  }))), /*#__PURE__*/React__default.createElement("div", {
    className: "lg-content p-2 p-md-4 p-lg-5"
  }, /*#__PURE__*/React__default.createElement(TabView, null))), /*#__PURE__*/React__default.createElement("div", {
    className: "ld-footer px-5"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "d-flex justify-content-between"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "float-md-left d-block d-md-inline-block mt-25"
  }, /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "footer.copyRight"
  })), /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "footer.companySlogan"
  }))), /*#__PURE__*/React__default.createElement("div", {
    className: "float-md-right d-none d-md-block"
  }, /*#__PURE__*/React__default.createElement("a", {
    className: "mr-1",
    href: "https://www.apple.com/app-store/",
    target: "_blank"
  }, /*#__PURE__*/React__default.createElement("img", {
    src: IMAGE.DOWNLOAD_APP_IOS,
    alt: "DOWNLOAD ON APP STORE"
  })), /*#__PURE__*/React__default.createElement("a", {
    href: "https://play.google.com/store/apps",
    target: "_blank"
  }, /*#__PURE__*/React__default.createElement("img", {
    src: IMAGE.DOWNLOAD_APP_ANDROID,
    alt: "DOWNLOAD ON APP I"
  })))))));
};

var AppRouter = function AppRouter(props) {
  var checkLoginStatus = props.checkLoginStatus,
      appId = props.appId,
      loginStatus = props.loginStatus,
      isAuthentication = props.isAuthentication,
      authToken = props.authToken,
      children = props.children,
      loadNavtigation = props.loadNavtigation,
      history = props.history,
      message = props.message;
  React.useEffect(function () {
    var code = new URLSearchParams(document.location.search).get('code') || authToken;

    if (code && loginStatus !== LOGIN_STATUS.SUCCESS) {
      HttpClient.addAuthTokenToHeader(code);
      checkLoginStatus(code);
    }

    if (authToken) {
      loadNavtigation();
    }
  }, [authToken]);

  var setMessages = function setMessages(message) {
    if (message === void 0) {
      message = {};
    }

    var newMessage = {};
    Object.keys(message).forEach(function (key) {
      newMessage[appId + '.' + key] = message[key];
    });
    return newMessage;
  };

  var appMessage = {
    en: _extends({}, messages_en, setMessages(message.en)),
    vi: _extends({}, messages_vi, setMessages(message.vi))
  };
  var settingRoutes = [{
    path: 'account-info',
    component: AccountSettings
  }, {
    path: 'change-password',
    component: AccountSettings
  }, {
    path: 'terms-and-condition',
    component: GeneralInfo
  }, {
    path: 'privacy-policy',
    component: GeneralInfo
  }, {
    path: 'language',
    component: GeneralInfo
  }, {
    path: 'contact',
    component: GeneralInfo
  }];
  var landingPageRoutes = [{
    path: 'login'
  }, {
    path: 'register'
  }, {
    path: 'forgot-password'
  }];
  return /*#__PURE__*/React__default.createElement(IntlProviderWrapper, {
    appMessage: appMessage
  }, /*#__PURE__*/React__default.createElement(reactRouterDom.Router, {
    history: history
  }, /*#__PURE__*/React__default.createElement(reactRouterDom.Switch, null, /*#__PURE__*/React__default.createElement(reactRouterDom.Route, {
    path: "/",
    render: function render(props) {
      return isAuthentication ? /*#__PURE__*/React__default.createElement(Layout$1, props, /*#__PURE__*/React__default.createElement(reactRouterDom.Switch, null, settingRoutes.map(function (item) {
        return /*#__PURE__*/React__default.createElement(reactRouterDom.Route, {
          key: item.path,
          path: "/" + item.path,
          render: function render() {
            return /*#__PURE__*/React__default.createElement(item.component, {
              activeTab: item.path
            });
          }
        });
      }), /*#__PURE__*/React__default.createElement(reactRouterDom.Route, {
        path: "/",
        render: function render() {
          return children;
        }
      }))) : /*#__PURE__*/React__default.createElement(reactRouterDom.Switch, null, landingPageRoutes.map(function (item) {
        return /*#__PURE__*/React__default.createElement(reactRouterDom.Route, {
          key: item.path,
          path: "/" + item.path,
          render: function render() {
            return /*#__PURE__*/React__default.createElement(LandingPage, {
              activeTab: item.path
            });
          }
        });
      }), /*#__PURE__*/React__default.createElement(reactRouterDom.Redirect, {
        from: "/",
        to: "/login"
      }));
    }
  }))));
};

var mapStateToProps$3 = function mapStateToProps(state) {
  return {
    isAuthentication: !!state.auth.authToken,
    authToken: state.auth.authToken,
    loginStatus: state.auth.loginStatus
  };
};

var AppRouter$1 = reactRedux.connect(mapStateToProps$3, {
  checkLoginStatus: checkLoginStatus,
  loadNavtigation: loadNavtigation,
  loginAction: loginAction
})(AppRouter);

TopBarProgress.config({
  shadowBlur: 5,
  barThickness: 5
});

var LoadingSpinner = function LoadingSpinner(_ref) {
  var showLoadingBar = _ref.showLoadingBar;
  return showLoadingBar ? /*#__PURE__*/React__default.createElement(TopBarProgress, null) : null;
};

var mapStateToProps$4 = function mapStateToProps(state) {
  return {
    showLoadingBar: state.customizer.showLoadingBar
  };
};

var LoadingSpinner$1 = reactRedux.connect(mapStateToProps$4)(LoadingSpinner);

var RippleButton = function RippleButton(_ref) {
  var rippleColor = _ref.rippleColor,
      during = _ref.during,
      block = _ref.block,
      rest = _objectWithoutPropertiesLoose(_ref, ["rippleColor", "during", "block"]);

  return /*#__PURE__*/React__default.createElement(Ripples, {
    color: rippleColor ? rippleColor : "rgba(255, 255, 255, .5)",
    during: during,
    className: "" + (block ? "d-block" : "")
  }, /*#__PURE__*/React__default.createElement(reactstrap.Button, rest));
};

RippleButton.propTypes = _extends({}, reactstrap.Button.propTypes, {
  rippleColor: PropTypes.string,
  during: PropTypes.number
});
reactstrap.Button.Ripple = RippleButton;

var isLocalhost = Boolean(window.location.hostname === 'localhost' || window.location.hostname === '[::1]' || window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));

function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function (registration) {
      registration.unregister();
    });
  }
}

var App = function App(_ref) {
  var children = _ref.children,
      appId = _ref.appId,
      appReducer = _ref.appReducer,
      message = _ref.message,
      history = _ref.history;
  var middlewares = [thunk, createDebounce()];
  var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux.compose;
  var store = redux.createStore(rootReducer(appReducer), {}, composeEnhancers(redux.applyMiddleware.apply(void 0, middlewares)));
  var persistor = reduxPersist.persistStore(store);
  setUpHttpClient(store);
  return /*#__PURE__*/React__default.createElement(reactRedux.Provider, {
    store: store
  }, /*#__PURE__*/React__default.createElement(react.PersistGate, {
    loading: null,
    persistor: persistor
  }, /*#__PURE__*/React__default.createElement(LoadingSpinner$1, null), /*#__PURE__*/React__default.createElement(AppRouter$1, {
    message: message,
    appId: appId,
    history: history,
    children: children
  }), /*#__PURE__*/React__default.createElement(reactToastify.ToastContainer, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true
  })));
};

unregister();

var FallbackSpinner = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(FallbackSpinner, _React$Component);

  function FallbackSpinner() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = FallbackSpinner.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/React__default.createElement("div", {
      className: "fallback-spinner vh-100"
    }, /*#__PURE__*/React__default.createElement("img", {
      className: "fallback-logo",
      src: IMAGE.LOGO,
      alt: "logo"
    }), /*#__PURE__*/React__default.createElement("div", {
      className: "loading"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "effect-1 effects"
    }), /*#__PURE__*/React__default.createElement("div", {
      className: "effect-2 effects"
    }), /*#__PURE__*/React__default.createElement("div", {
      className: "effect-3 effects"
    })));
  };

  return FallbackSpinner;
}(React__default.Component);

var DatePicker = function DatePicker(props) {
  return /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, {
    className: "form-label-group position-relative"
  }, /*#__PURE__*/React__default.createElement(Flatpickr, props), /*#__PURE__*/React__default.createElement(reactstrap.Label, null, props.placeholder));
};

var Select = function Select(props) {
  var _useState = React.useState(props.defaultValue || ''),
      inputValue = _useState[0],
      setInputValue = _useState[1];

  var _useState2 = React.useState(false),
      isFocused = _useState2[0],
      setIsFocused = _useState2[1];

  var onChange = function onChange(e, actions) {
    if (props.onChange) {
      props.onChange(e, actions);
    }

    if (props.isMulti) {
      setInputValue(e ? e.map(function (item) {
        return item.value;
      }).join() : '');
    } else {
      setInputValue(e ? e.value : '');
    }
  };

  var onFocus = function onFocus(e) {
    if (props.onFocus) {
      props.onChange(e);
    }

    setIsFocused(true);
  };

  var onBlur = function onBlur(e) {
    if (props.onBlur) {
      props.onBlur(e);
    }

    setIsFocused(false);
  };

  return /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, {
    className: "form-label-group position-relative"
  }, /*#__PURE__*/React__default.createElement(Select$1, _extends({}, props, {
    onChange: onChange,
    onBlur: onBlur,
    onFocus: onFocus,
    theme: function theme(_theme) {
      return _extends({}, _theme, {
        colors: _extends({}, _theme.colors, {
          primary: '#338955'
        })
      });
    }
  })), /*#__PURE__*/React__default.createElement("input", {
    className: "d-none",
    placeholder: props.placeholder,
    value: inputValue
  }), /*#__PURE__*/React__default.createElement(reactstrap.Label, {
    className: classnames({
      'text-primary': isFocused
    })
  }, props.placeholder));
};

function getWindowDimensions() {
  var _window = window,
      width = _window.innerWidth,
      height = _window.innerHeight;
  return {
    width: width,
    height: height
  };
}

function useWindowDimensions() {
  var _useState = React.useState(getWindowDimensions()),
      windowDimensions = _useState[0],
      setWindowDimensions = _useState[1];

  React.useEffect(function () {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return function () {
      return window.removeEventListener('resize', handleResize);
    };
  }, []);
  return windowDimensions;
}

Object.defineProperty(exports, 'toast', {
  enumerable: true,
  get: function () {
    return reactToastify.toast;
  }
});
Object.defineProperty(exports, 'Button', {
  enumerable: true,
  get: function () {
    return reactstrap.Button;
  }
});
Object.defineProperty(exports, 'FormattedMessage', {
  enumerable: true,
  get: function () {
    return reactIntl.FormattedMessage;
  }
});
exports.AppId = AppId;
exports.AutoComplete = Autocomplete;
exports.BaseApp = App;
exports.DatePicker = DatePicker;
exports.FallbackSpinner = FallbackSpinner;
exports.HttpClient = HttpClient;
exports.Radio = Radio;
exports.Select = Select;
exports.useDeviceDetect = useDeviceDetect;
exports.useWindowDimensions = useWindowDimensions;
//# sourceMappingURL=index.js.map
