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
var reactIntl = require('react-intl');
var history$1 = require('history');
var sessionStorage = _interopDefault(require('redux-persist/es/storage/session'));
var reactRouterDom = require('react-router-dom');
var classnames = _interopDefault(require('classnames'));
var reactstrap = require('reactstrap');
var PerfectScrollbar = _interopDefault(require('react-perfect-scrollbar'));
var ReactDOM = _interopDefault(require('react-dom'));
var PropTypes = _interopDefault(require('prop-types'));
var ScrollToTop = _interopDefault(require('react-scroll-up'));
var Hammer = _interopDefault(require('react-hammerjs'));
var Yup = require('yup');
var formik = require('formik');
var Flatpickr = _interopDefault(require('react-flatpickr'));
var Select$1 = _interopDefault(require('react-select'));
var chroma = _interopDefault(require('chroma-js'));
var styled = _interopDefault(require('styled-components'));
var TopBarProgress = _interopDefault(require('react-topbar-progress-indicator'));
var Ripples = _interopDefault(require('react-ripples'));
require('react-perfect-scrollbar/dist/css/styles.css');
require('react-toastify/dist/ReactToastify.css');
require('prismjs/themes/prism-tomorrow.css');

var generateUUID = function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
};

var API_BASE_URL = 'https://apisit.inon.vn';
var API_LOGIN_URL = '/api/authenticate';
var API_LOGOUT_URL = '/api/authenticate';
var API_REGISTER = '/nth/onboarding/api/authenticate/register';
var API_GET_USER = '/nth/user/api/users';
var API_GET_NAV_CONFIGS = '/nth/accesscontrol/api/roles';
var API_CREATE_PASSWORD = '/nth/onboarding/api/authenticate/create-new-password';
var API_GET_USER_BY_REGISTER_TOKEN = '/nth/onboarding/api/authenticate/get-partner';
var API_COMPLETE_INFO = '/nth/onboarding/api/authenticate/complete-info';
var API_FORGOT_PASSWORD = '/api/authenticate/forgot-password';
var API_RESET_PASSWORD = '/api/authenticate/reset-password';
var API_EMAIL_SUGGESTION = '/nth/user/api/authenticate/email-suggestion';
var API_R_200 = 200;
var MAX_MOBILE_WIDTH = 768;
var REMEMBER_ME_TOKEN = 'rememberMe';
var PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])((?=.*[0-9])|(?=.*[!@#$%^&*])).{8,}$/gm;
var PHONE_REGEX = /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
var LOGIN_STATUS = {
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL'
};
var GENDER_OPTIONS = [{
  value: 'MALE',
  label: /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "Nam"
  })
}, {
  value: 'FEMALE',
  label: /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "N\u1EEF"
  })
}, {
  value: 'OTHER',
  label: /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "Kh\xE1c"
  })
}];
var APP_URL = 'https://sit2.inon.vn';
var IMAGE = {
  LOGO: 'https://firebasestorage.googleapis.com/v0/b/inon-8d496.appspot.com/o/Logo.png?alt=media&token=68d3ab7a-e9bb-4c43-a543-c65f72033bf9',
  LOGO_NO_TEXT: 'https://firebasestorage.googleapis.com/v0/b/inon-8d496.appspot.com/o/logo-no-text.png?alt=media&token=4c266c6a-bd1c-49f9-b51c-1e2484925b06',
  NAV_ICON_1: 'https://firebasestorage.googleapis.com/v0/b/inon-8d496.appspot.com/o/nav-icon-1.png?alt=media&token=0ccdb6bc-09da-43a3-b18f-56d2598e542b',
  NAV_ICON_2: 'https://firebasestorage.googleapis.com/v0/b/inon-8d496.appspot.com/o/nav-icon-2.png?alt=media&token=def3402b-65f0-458b-b4f8-e9c6d8d3bb09',
  NAV_ICON_3: 'https://firebasestorage.googleapis.com/v0/b/inon-8d496.appspot.com/o/nav-icon-3.png?alt=media&token=1ce1a25c-b095-4f80-8987-3ae9b977e3a8',
  NAV_ICON_4: 'https://firebasestorage.googleapis.com/v0/b/inon-8d496.appspot.com/o/nav-icon-4.png?alt=media&token=549432c1-9dd6-4d0a-948a-3f2de513d238',
  NAV_ICON_5: 'https://firebasestorage.googleapis.com/v0/b/inon-8d496.appspot.com/o/nav-icon-5.png?alt=media&token=659d7162-783c-42ed-af7a-d05d0a3be595',
  BUY_INSURANCE: 'https://firebasestorage.googleapis.com/v0/b/inon-8d496.appspot.com/o/Vector.png?alt=media&token=56bac236-f494-4643-81f1-11611229e62e',
  LOGO_WHITE: 'https://firebasestorage.googleapis.com/v0/b/inon-8d496.appspot.com/o/LogoWhite.png?alt=media&token=8289e81f-7b3f-41cd-b5dc-5220bbe8d203',
  LANDING_PAGE_BG: 'https://firebasestorage.googleapis.com/v0/b/inon-8d496.appspot.com/o/IO-Signup-01%203%20(1).png?alt=media&token=19aca74e-c81f-40e2-a00d-a91b7ee9f27a',
  LANDING_PAGE_2_BG: 'https://firebasestorage.googleapis.com/v0/b/inon-8d496.appspot.com/o/BG-step5-02%201.png?alt=media&token=2902f404-802a-4c4a-89f5-39a4cd72ab44',
  LANDING_PAGE_TABLET_BG: 'https://firebasestorage.googleapis.com/v0/b/inon-8d496.appspot.com/o/IO-Bg-ipad(doc)-05.png?alt=media&token=2a140f47-3de6-4a08-9eed-5e2e26e57252',
  DOWNLOAD_APP_IOS: 'https://firebasestorage.googleapis.com/v0/b/inon-8d496.appspot.com/o/IO-APP%26GP-03.png?alt=media&token=c9a13eca-3fe6-40d0-ac1d-df417b95385d',
  DOWNLOAD_APP_ANDROID: 'https://firebasestorage.googleapis.com/v0/b/inon-8d496.appspot.com/o/IO-APP%26GP-01.png?alt=media&token=b2aefa9d-d464-41d3-9fd0-b374ed0dca93'
};

var HttpClient = Axios.create({
  timeout: 10000,
  adapter: axiosExtensions.throttleAdapterEnhancer(axiosExtensions.cacheAdapterEnhancer(Axios.defaults.adapter, {
    threshold: 15 * 60 * 1000
  })),
  invalidate: function (config, request) {
    try {
      var _temp2 = function () {
        if (request.clearCacheEntry) {
          return Promise.resolve(config.store.removeItem(config.uuid)).then(function () {});
        }
      }();

      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  }
});
HttpClient.defaults.headers['Content-Type'] = 'application/json';
var errorMessage = function errorMessage(message) {
  return /*#__PURE__*/React__default.createElement("div", {
    className: "d-flex align-items-center"
  }, /*#__PURE__*/React__default.createElement(Icon.AlertTriangle, null), " ", /*#__PURE__*/React__default.createElement("span", {
    className: "ml-1"
  }, message));
};
var setUpHttpClient = function setUpHttpClient(store, apiBaseUrl) {
  var deviceId = localStorage.getItem('deviceId');
  var language = localStorage.getItem('language');

  if (!deviceId) {
    deviceId = generateUUID();
    localStorage.setItem('deviceId', deviceId);
  }

  if (!language) {
    localStorage.setItem('language', 'vi');
  }

  HttpClient.defaults.baseURL = apiBaseUrl || API_BASE_URL;
  HttpClient.interceptors.request.use(function (config) {
    var token = store.getState().auth.authToken;
    language = localStorage.getItem('language');

    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }

    config.headers.deviceId = deviceId;
    config.headers.language = language;

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
      case 403:
        reactToastify.toast.error(errorMessage(e.response.data.message));
        store.dispatch({
          type: 'LOGOUT_ACTION'
        });

      case 400:
      case 500:
        reactToastify.toast.error(errorMessage(e.response.data.message));
    }

    return e.response;
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

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
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

    default:
      return state;
  }
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
var setBaseHistory = function setBaseHistory(appHistory) {
  history = appHistory;
};

var AuthService = function AuthService() {};

AuthService.login = function (user) {
  return HttpClient.post(API_LOGIN_URL, user);
};

AuthService.getUserInfo = function (username, authToken) {
  var headers = {
    Authorization: "Bearer " + authToken
  };
  return HttpClient.get(API_GET_USER + "/" + username, {
    headers: headers
  });
};

AuthService.getUserByRegisterToken = function (registerToken) {
  return HttpClient.get(API_GET_USER_BY_REGISTER_TOKEN + "/" + registerToken);
};

AuthService.compeleteInfo = function (user) {
  return HttpClient.post("" + API_COMPLETE_INFO, user);
};

AuthService.logout = function (user) {
  return HttpClient.post(API_LOGOUT_URL, user);
};

AuthService.createPassword = function (password, registerToken) {
  return HttpClient.post(API_CREATE_PASSWORD, {
    password: password,
    registerToken: registerToken
  });
};

AuthService.register = function (user) {
  return HttpClient.post(API_REGISTER, user);
};

AuthService.checkLoginByToken = function () {
  return HttpClient.get(API_LOGIN_URL);
};

AuthService.getSuggestionEmail = function (username) {
  return HttpClient.get(API_EMAIL_SUGGESTION + "/" + username);
};

AuthService.forgotPassword = function (username, email) {
  return HttpClient.post(API_FORGOT_PASSWORD, {
    username: username,
    email: email
  });
};

AuthService.resetPassword = function (password, resetToken) {
  return HttpClient.post(API_RESET_PASSWORD, {
    password: password,
    resetToken: resetToken
  });
};

var LOGIN_ACTION = 'LOGIN_ACTION';
var LOGIN_FAIL_ACTION = 'LOGIN_FAIL_ACTION';
var LOGOUT_ACTION = 'LOGOUT_ACTION';
var SAVE_REGISTER_TOKEN = 'SAVE_REGISTER_TOKEN';
var SAVE_RESET_PASSWORD_TOKEN = 'SAVE_RESET_PASSWORD_TOKEN';
var checkLoginStatus = function checkLoginStatus(authToken) {
  return function (dispatch, getState) {
    try {
      var _temp3 = _catch(function () {
        return Promise.resolve(AuthService.checkLoginByToken()).then(function (response) {
          var username = getState().auth.user.username;

          var _temp = function () {
            if (response.status === API_R_200 && username) {
              return Promise.resolve(AuthService.getUserInfo(getState().auth.user.username, authToken)).then(function (_AuthService$getUserI) {
                response = _AuthService$getUserI;
                dispatch({
                  type: LOGIN_ACTION,
                  payload: {
                    authToken: authToken,
                    user: response.data || {}
                  }
                });
                history.push(history.location.pathname);
              });
            } else {
              dispatch({
                type: LOGOUT_ACTION
              });
            }
          }();

          if (_temp && _temp.then) return _temp.then(function () {});
        });
      }, function (error) {
        console.log(error);
        dispatch({
          type: LOGOUT_ACTION
        });
      });

      return Promise.resolve(_temp3 && _temp3.then ? _temp3.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
};
var loginAction = function loginAction(user) {
  return function (dispatch) {
    try {
      var _temp6 = _catch(function () {
        user.rememberMe = user.isRemeberMe;
        return Promise.resolve(AuthService.login(user)).then(function (response) {
          var _temp4 = function () {
            if (response.status === API_R_200) {
              var authToken = response.data.id_token;
              return Promise.resolve(AuthService.getUserInfo(user.username, authToken)).then(function (_AuthService$getUserI2) {
                response = _AuthService$getUserI2;

                if (user.isRemeberMe) {
                  localStorage.setItem(REMEMBER_ME_TOKEN, JSON.stringify({
                    username: user.username,
                    name: response.data.fullName
                  }));
                }

                dispatch({
                  type: LOGIN_ACTION,
                  payload: {
                    authToken: authToken,
                    user: response.data || []
                  }
                });
                history.push('/');
              });
            } else {
              var token = {
                authToken: 'authToken',
                user: {}
              };
              dispatch({
                type: LOGOUT_ACTION
              });
              reactToastify.toast.error(errorMessage( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
                id: "login.fail"
              })));
            }
          }();

          if (_temp4 && _temp4.then) return _temp4.then(function () {});
        });
      }, function (error) {
        console.log(error);
      });

      return Promise.resolve(_temp6 && _temp6.then ? _temp6.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
};
var createPassword = function createPassword(password) {
  return function (dispatch, getState) {
    try {
      var _temp8 = _catch(function () {
        return Promise.resolve(AuthService.createPassword(password, getState().auth.register.token)).then(function (response) {
          if (response.status === 200 && response.data) {
            history.push('/complete-information');
          }
        });
      }, function () {});

      return Promise.resolve(_temp8 && _temp8.then ? _temp8.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
};
var compeleteInfo = function compeleteInfo(user) {
  return function (dispatch, getState) {
    try {
      var _temp10 = _catch(function () {
        user.registerToken = getState().auth.register.token;
        return Promise.resolve(AuthService.compeleteInfo(user)).then(function (response) {
          if (response.status === 200 && response.data) {
            reactToastify.toast.success('Hoàn tất đăng ký thành công');
            history.push('/');
          }
        });
      }, function (error) {
        console.log(error);
      });

      return Promise.resolve(_temp10 && _temp10.then ? _temp10.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
};
var saveRegisterToken = function saveRegisterToken(registerToken) {
  return function (dispatch) {
    try {
      return Promise.resolve(AuthService.getUserByRegisterToken(registerToken)).then(function (response) {
        if (response.status === 200 && response.data) {
          dispatch({
            type: SAVE_REGISTER_TOKEN,
            payload: {
              token: registerToken,
              user: response.data
            }
          });
        } else {
          history.push('/');
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
};
var saveResetPasswordToken = function saveResetPasswordToken(token) {
  return function (dispatch) {
    dispatch({
      type: SAVE_RESET_PASSWORD_TOKEN,
      payload: token
    });
  };
};
var forgotPassword = function forgotPassword(_ref) {
  var username = _ref.username,
      email = _ref.email;
  return function (dispatch, getState) {
    try {
      var _temp12 = _catch(function () {
        return Promise.resolve(AuthService.forgotPassword(username, email)).then(function (response) {
          if (response.status === 200 && response.data) {
            reactToastify.toast.success( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
              id: "forgotPassword.successfull"
            }));
            dispatch({
              type: SAVE_RESET_PASSWORD_TOKEN,
              payload: ''
            });
            history.push('/');
          }
        });
      }, function () {});

      return Promise.resolve(_temp12 && _temp12.then ? _temp12.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
};
var resetPassword = function resetPassword(password) {
  return function (dispatch, getState) {
    try {
      var _temp14 = _catch(function () {
        return Promise.resolve(AuthService.resetPassword(password, getState().auth.resetPasswordToken)).then(function (response) {
          if (response.status === 200 && response.data) {
            reactToastify.toast.success( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
              id: "createPassword.resetSuccessFul"
            }));
            dispatch({
              type: SAVE_RESET_PASSWORD_TOKEN,
              payload: ''
            });
            history.push('/');
          }
        });
      }, function () {});

      return Promise.resolve(_temp14 && _temp14.then ? _temp14.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };
};
var logoutAction = function logoutAction() {
  return function (dispatch) {
    try {
      try {
        dispatch({
          type: LOGOUT_ACTION
        });
      } catch (error) {
        history.push('/');
        dispatch({
          type: LOGOUT_ACTION
        });
      }

      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };
};

var authInitialState = {
  authToken: '',
  user: '',
  loginStatus: '',
  register: {
    user: {},
    token: ''
  },
  resetPasswordToken: ''
};
var authReducers = function authReducers(state, action) {
  if (state === void 0) {
    state = _extends({}, authInitialState);
  }

  switch (action.type) {
    case LOGIN_ACTION:
      {
        return _extends({}, state, action.payload, {
          loginStatus: LOGIN_STATUS.SUCCESS
        });
      }

    case LOGOUT_ACTION:
      {
        return _extends({}, authInitialState);
      }

    case LOGIN_FAIL_ACTION:
      {
        return _extends({}, state, {
          loginStatus: LOGIN_STATUS.FAIL
        });
      }

    case SAVE_REGISTER_TOKEN:
      {
        return _extends({}, state, {
          register: action.payload
        });
      }

    case SAVE_RESET_PASSWORD_TOKEN:
      {
        return _extends({}, state, {
          resetPasswordToken: action.payload
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
  var IconTag = Icon[role.icon];
  var item = {};
  item.id = role.id;
  item.type = 'item';
  item.code = role.code;
  item.appId = role.appId;
  item.title = "menu." + role.keyLang;
  item.icon = /*#__PURE__*/React__default.createElement(IconTag, {
    size: 20
  });
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
  return HttpClient.get(API_GET_NAV_CONFIGS, {
    isBackgroundRequest: true
  });
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

var initialState$1 = {
  isLoading: false
};

var uiReducer = function uiReducer(state, action) {
  if (state === void 0) {
    state = initialState$1;
  }

  switch (action.type) {
    case 'SHOW_LOADING_BAR':
      return _extends({}, state, {
        isLoading: true
      });

    case 'HIDE_LOADING_BAR':
      return _extends({}, state, {
        isLoading: false
      });

    default:
      return state;
  }
};

var rootReducer = function rootReducer(appReducer) {
  return redux.combineReducers({
    customizer: customizerReducer,
    ui: uiReducer,
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

    _this.onSuggestionItemClick = function (item, e) {
      if (_this.props.onSuggestionClick) {
        _this.props.onSuggestionClick(item, e);
      }

      _this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: e.currentTarget.innerText
      });
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
              _this.onSuggestionItemClick(_this.filteredData[activeSuggestion], e);

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
              return onSuggestionItemClick(item, e);
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
              return onSuggestionItemClick(suggestion, e);
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
  }, /*#__PURE__*/React__default.createElement(Icon.User, {
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

    _this.onSuggestionItemClick = function (item) {
      if (!item.isExternalApp) {
        history.push("" + item.menuPath);
      } else {
        window.location.href = item.navLinkExternal;
      }
    };

    return _this;
  }

  var _proto = NavbarUser.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this2 = this;

    if (prevProps.roles !== this.props.roles) {
      var suggestions = this.props.roles.map(function (item) {
        item.name = _this2.props.intl.formatMessage({
          id: "menu." + item.keyLang
        });
        item.isExternalApp = item.appId !== _this2.props.appId;
        item.navLinkExternal = APP_URL + item.menuPath + "?code=" + _this2.props.authToken;
        return item;
      });
      this.setState({
        suggestions: suggestions
      });
    }
  };

  _proto.render = function render() {
    var _this3 = this;

    var _this$props$user = this.props.user,
        userSettings = _this$props$user.userSettings,
        user = _objectWithoutPropertiesLoose(_this$props$user, ["userSettings", "userDetails"]);

    userSettings = userSettings || {};
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
      filterKey: "name",
      onSuggestionClick: this.onSuggestionItemClick,
      autoFocus: true,
      clearInput: this.state.navbarSearch,
      externalClick: function externalClick() {
        _this3.setState({
          navbarSearch: false
        });
      },
      onKeyDown: function onKeyDown(e) {
        if (e.keyCode === 27 || e.keyCode === 13) {
          _this3.setState({
            navbarSearch: false
          });

          _this3.props.handleAppOverlay('');
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
            return onSuggestionItemClick(item, e);
          },
          onMouseEnter: function onMouseEnter() {
            return onSuggestionItemHover(filteredData.indexOf(item));
          }
        }, /*#__PURE__*/React__default.createElement("div", {
          className: "d-flex align-items-center"
        }, /*#__PURE__*/React__default.createElement(IconTag, {
          size: 17
        }), /*#__PURE__*/React__default.createElement("div", {
          className: "ml-2"
        }, item.name)));
      },
      onSuggestionsShown: function onSuggestionsShown(userInput) {
        if (_this3.state.navbarSearch) {
          _this3.props.handleAppOverlay(userInput);
        }
      }
    }), /*#__PURE__*/React__default.createElement("div", {
      className: "search-input-close"
    }, /*#__PURE__*/React__default.createElement(Icon.X, {
      size: 24,
      onClick: function onClick(e) {
        e.stopPropagation();

        _this3.setState({
          navbarSearch: false
        });

        _this3.props.handleAppOverlay('');
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
    }, user.fullName)), /*#__PURE__*/React__default.createElement("span", {
      "data-tour": "user"
    }, /*#__PURE__*/React__default.createElement("img", {
      src: userSettings.avatar || '',
      className: "round",
      height: "40",
      width: "40",
      alt: "avatar"
    }))), /*#__PURE__*/React__default.createElement(UserDropdown, this.props)));
  };

  return NavbarUser;
}(React__default.PureComponent);

var NavbarUser$1 = reactIntl.injectIntl(NavbarUser);

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
    className: "nav navbar-nav d-none d-xl-flex bookmark-icons"
  }, Array(5).fill(0).map(function (_, index) {
    return /*#__PURE__*/React__default.createElement(reactstrap.NavItem, {
      key: index
    }, /*#__PURE__*/React__default.createElement("img", {
      className: "img-fluid",
      src: IMAGE["NAV_ICON_" + (index + 1)]
    }));
  })))), /*#__PURE__*/React__default.createElement(NavbarUser$1, {
    handleAppOverlay: props.handleAppOverlay,
    changeCurrentLang: props.changeCurrentLang,
    appId: props.appId,
    authToken: props.authToken,
    user: props.user,
    roles: props.roles,
    isAuthenticated: props.isAuthenticated,
    logoutAction: props.logoutAction
  }))))));
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    user: state.auth.user,
    isAuthenticated: !!state.auth.name,
    roles: state.navbar.roles,
    authToken: state.auth.authToken
  };
};

var Navbar = reactRedux.connect(mapStateToProps, {
  logoutAction: logoutAction
})(ThemeNavbar);

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

var Footer = function Footer(props) {
  var _useWindowDimensions = useWindowDimensions(),
      width = _useWindowDimensions.width;

  var history = reactRouterDom.useHistory();
  var navConfigs = reactRedux.useSelector(function (state) {
    return [].concat(state.navbar.navConfigs);
  });
  var authToken = reactRedux.useSelector(function (state) {
    return state.auth.authToken;
  });

  var goToPage = function goToPage(e, name) {
    e.preventDefault();
    var currentRoute = navConfigs.find(function (item) {
      return item.code === name;
    });

    if (!currentRoute) {
      currentRoute = {
        isExternalApp: AppId.APP_NO1 === props.AppId,
        navLink: ''
      };
    }

    if (!currentRoute.isExternalApp) {
      history.push("" + currentRoute.navLink);
    } else {
      window.location.href = APP_URL + currentRoute.navLink + "?code=" + authToken;
    }
  };

  return /*#__PURE__*/React__default.createElement("footer", null, /*#__PURE__*/React__default.createElement("div", {
    className: classnames('footer footer-light', {
      'd-none': width < MAX_MOBILE_WIDTH
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
    className: classnames('footer footer-light footer-mobile text-center', {
      'd-none': width >= MAX_MOBILE_WIDTH
    })
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "w-25"
  }, /*#__PURE__*/React__default.createElement("a", {
    href: "#",
    onClick: function onClick(e) {
      return goToPage(e, 'home');
    }
  }, /*#__PURE__*/React__default.createElement(Icon.Home, null), /*#__PURE__*/React__default.createElement("div", {
    className: "mt-1"
  }, "Trang ch\u1EE7"))), /*#__PURE__*/React__default.createElement("div", {
    className: "w-25"
  }, /*#__PURE__*/React__default.createElement("a", {
    href: "#",
    onClick: function onClick(e) {
      return goToPage(e, 'buyInsurance');
    }
  }, /*#__PURE__*/React__default.createElement(Icon.List, null), /*#__PURE__*/React__default.createElement("div", {
    className: "mt-1"
  }, "H\u1EE3p \u0111\u1ED3ng"))), /*#__PURE__*/React__default.createElement("div", {
    className: "position-relative w-25"
  }, /*#__PURE__*/React__default.createElement("a", {
    href: "#",
    onClick: function onClick(e) {
      return goToPage(e, 'contractManagemen');
    }
  }, /*#__PURE__*/React__default.createElement("img", {
    src: IMAGE.BUY_INSURANCE,
    className: "buy-insurance",
    alt: ""
  }), /*#__PURE__*/React__default.createElement(Icon.PlusCircle, {
    style: {
      visibility: 'hidden'
    }
  }), /*#__PURE__*/React__default.createElement("div", {
    className: "mt-1"
  }, "Mua b\u1EA3o hi\u1EC3m"))), /*#__PURE__*/React__default.createElement("div", {
    className: "w-25"
  }, /*#__PURE__*/React__default.createElement("a", {
    href: "#",
    onClick: function onClick(e) {
      return goToPage(e, 'home');
    }
  }, /*#__PURE__*/React__default.createElement(Icon.Gift, null), /*#__PURE__*/React__default.createElement("div", {
    className: "mt-1"
  }, "Khuy\u1EBFn m\u1EA1i"))), /*#__PURE__*/React__default.createElement("div", {
    className: "w-25"
  }, /*#__PURE__*/React__default.createElement("a", {
    href: "#",
    onClick: function onClick(e) {
      return goToPage(e, 'home');
    }
  }, /*#__PURE__*/React__default.createElement(Icon.MessageSquare, null), /*#__PURE__*/React__default.createElement("div", {
    className: "mt-1"
  }, "Li\xEAn h\u1EC7")))), props.hideScrollToTop === false ? /*#__PURE__*/React__default.createElement(ScrollToTop, {
    showUnder: 160
  }, /*#__PURE__*/React__default.createElement(reactstrap.Button, {
    color: "primary",
    className: "btn-icon scroll-top d-none d-md-block"
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
        sidebarState = _this$props.sidebarState,
        toggle = _this$props.toggle,
        sidebarVisibility = _this$props.sidebarVisibility,
        menuShadow = _this$props.menuShadow;
    return /*#__PURE__*/React__default.createElement("div", {
      className: "navbar-header"
    }, /*#__PURE__*/React__default.createElement("ul", {
      className: "nav navbar-nav flex-row"
    }, /*#__PURE__*/React__default.createElement("li", {
      className: "nav-item my-auto mr-auto"
    }, /*#__PURE__*/React__default.createElement(reactRouterDom.NavLink, {
      to: "/"
    }, /*#__PURE__*/React__default.createElement("img", {
      className: "img-fluid logo-img",
      src: !sidebarState || !collapsed ? IMAGE.LOGO : IMAGE.LOGO_NO_TEXT,
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
      appId: this.props.appId,
      sidebarVisibility: this.handleSidebarVisibility,
      currentLang: this.state.currentLang,
      changeCurrentLang: this.handleCurrentLanguage,
      handleAppOverlay: this.handleAppOverlay,
      appOverlayState: this.state.appOverlay,
      navbarColor: appProps.navbarColor,
      navbarType: appProps.navbarType
    };
    var footerProps = {
      appId: this.props.appId,
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
          var roles = res.data || [];
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
      locale: localStorage.getItem('language'),
      messages: _this.props.appMessage[localStorage.getItem('language')]
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
          localStorage.setItem('language', language);

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
var forgotPassword$1 = "Forgot password";
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
	"login.sayHi": "Hi, {name}",
	register: register,
	"register.fullname": "Full name *",
	"register.fullname.required": "You must enter your full name",
	"register.email.required": "You must enter your email address",
	"register.email.invalid": "You must enter your valid email address",
	"register.phoneNumber": "Phone mumber *",
	"register.phoneNumber.invalid": "You must enter your valid phone number",
	"register.phoneNumber.required": "You must enter your phone number",
	"register.refCode": "Referal code",
	"register.refCode.invalid": "Referal code is invalid",
	"register.mustAppcepted": "Your must accept our terms and conditions",
	"register.registerSuccess": "Register Successful",
	"register.agreeWith": "I agree with",
	"register.policyAndCondition": "Terms and Condition",
	"register.useService": "use service",
	forgotPassword: forgotPassword$1,
	"forgotPassword.verify": "Verify",
	"forgotPassword.username": "Username *",
	"forgotPassword.username.required": "You must enter username",
	"forgotPassword.email": "Email registration *",
	"forgotPassword.email.required": "You must enter email registration",
	"forgotPassword.successfull": "Your reset password link has sent to your email",
	"forgotPassword.fail": "Your phone number or email is incorrect",
	"forgotPassword.notFoundEmailSuggestion": "Not found any email with your username",
	"forgotPassword.yourEmailIs": "Your email is",
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
	"menu.insuranceMotobike": "Insurance Motibike",
	"menu.insuranceCar": "Insurance Car",
	"menu.approveOpenAccount": "Approve Open Account",
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
	"changePassword.passwordMustMatch": "Password must match",
	"createPassword.title": "CREATE PASSWORD *",
	"createPassword.password.required": "You must enter your password",
	"createPassword.password.invalid": "You password is invalid",
	"createPassword.enterThePassword": "Enter the password *",
	"createPassword.passwordMustMatch": "Password must match",
	"createPassword.condition.1": "- At least 8 characters long",
	"createPassword.condition.2": "- Include upper and lower case characters",
	"createPassword.condition.3": "- Include numeric or special characters",
	"createPassword.continutes": "CONTINUTE",
	"createPassword.done": "DONE",
	"createPassword.resetSuccessFul": "Change password successful",
	"provideNewPassword.title": "PROVIDE A NEW PASSWORD",
	"provideNewPassword.continutes": "DONE",
	"provideNewPassword.password": "Enter your new password *",
	"provideNewPassword.enterThePassword": "Enter a new password *",
	"completeInformation.idType": "Type of identification*",
	"completeInformation.nbrPer": "Identification number*",
	"completeInformation.nbrPer.required": "You must enter infor number",
	"completeInformation.nbrPer.invalid": "You Indenetication number is invalid",
	"completeInformation.dateOfBirth": "Date of birth",
	"completeInformation.dateOfBirth.required": "You must enter date of birth",
	"completeInformation.address": "Address*",
	"completeInformation.address.required": "You must enter address",
	"completeInformation.gif": "Referral code",
	"completeInformation.branch": "Branch*",
	"completeInformation.branch.required": "You must enter branch",
	"completeInformation.accountNbr": "Account number*",
	"completeInformation.accountNbr.required": "You must enter account number",
	"completeInformation.personalInfo": "Passport*",
	"completeInformation.gender": "Gender",
	"completeInformation.province": "City*",
	"completeInformation.province.required": "You must select your city",
	"completeInformation.district": "District*",
	"completeInformation.district.required": "You must select your district",
	"completeInformation.ward": "Wards*",
	"completeInformation.ward.required": "You must select your ward",
	"completeInformation.bank": "Bank*",
	"completeInformation.bank.required": "Bạn phải chọn Ngân hàng*",
	"completeInformation.back": "BACK",
	"completeInformation.done": "DONE"
};

var login$1 = "Đăng nhập";
var register$1 = "Đăng ký";
var forgotPassword$2 = "Quên mật khẩu";
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
	"login.sayHi": "Xin chào, {name}",
	register: register$1,
	"register.fullname": "Họ và tên *",
	"register.fullname.required": "Bạn phải nhập họ và tên",
	"register.email.required": "Bạn phải nhập địa chỉ email",
	"register.email.invalid": "Địa chỉ email không hợp lệ",
	"register.phoneNumber": "Số điện thoại *",
	"register.phoneNumber.required": "Bạn phải nhập số điện thoại",
	"register.phoneNumber.invalid": "Số điện thoại không hợp lệ",
	"register.refCode": "Mã giới thiệu",
	"register.refCode.invalid": "Mã giới thiệu không hợp lệ",
	"register.mustAppcepted": "Bạn phải đồng ý điều khoản và điều kiện của chúng tôi",
	"register.registerSuccess": "Đăng ký thành công",
	"register.agreeWith": "Tôi đồng ý với",
	"register.policyAndCondition": "Điều khoản và Điều kiện",
	"register.useService": "sử dụng dịch vụ.",
	forgotPassword: forgotPassword$2,
	"forgotPassword.verify": "Xác thực",
	"forgotPassword.username": "Tên tài khoản *",
	"forgotPassword.username.required": "Bạn phải nhập tên tài khoản",
	"forgotPassword.email": "Email đăng ký *",
	"forgotPassword.email.required": "Bạn phải nhập email đăng ký",
	"forgotPassword.successfull": "Link thay đổi password đã được gửi đến email của bạn",
	"forgotPassword.fail": "Số điện thoại hoặc Email của bạn không chính xác",
	"forgotPassword.notFoundEmailSuggestion": "Không tìm thấy email với tên đăng nhập của bạn",
	"forgotPassword.yourEmailIs": "Email của bạn là",
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
	"menu.insuranceMotobike": "Bảo hiểm xe máy",
	"menu.insuranceCar": "Bảo hiểm ô tô",
	"menu.approveOpenAccount": "Phê duyệt mở tài khoản  ",
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
	"changePassword.passwordMustMatch": "Mật khẩu không trùng khớp",
	"createPassword.title": "TẠO MẬT KHẨU *",
	"createPassword.password.required": "Bạn phải nhập mật khẩu",
	"createPassword.password.invalid": "Mật khẩu của bạn không hợp lệ",
	"createPassword.enterThePassword": "Nhập lại mật khẩu *",
	"createPassword.passwordMustMatch": "Mật khẩu phải trùng khớp",
	"createPassword.condition.1": "- Dài ít nhất 8 ký tự",
	"createPassword.condition.2": "- Bao gồm ký tự viết hoa và viết thường",
	"createPassword.condition.3": "- Bao gồm ký tự số hoặc ký tự đặc biệt",
	"createPassword.continutes": "TIẾP TỤC",
	"createPassword.done": "HOÀN THÀNH",
	"createPassword.resetSuccessFul": "Thay đổi mật khẩu thành công",
	"provideNewPassword.title": "CẤP MẬT KHẨU MỚI",
	"provideNewPassword.continutes": "THỰC HIỆN",
	"provideNewPassword.password": "Nhập mật khẩu mới *",
	"provideNewPassword.enterThePassword": "Nhập lại mật khẩu mới *",
	"createPassword.enterThePassword.required": "Bạn phải nhập mật khẩu mới",
	"completeInformation.idType": "Loại giấy tờ tùy thân *",
	"completeInformation.nbrPer": "Số giấy tờ tuỳ thân *",
	"completeInformation.nbrPer.required": "Bạn phải nhập số giấy tờ tuỳ thân",
	"completeInformation.nbrPer.invalid": "Số giấy tờ tùy thân không hợp lệ",
	"completeInformation.dateOfBirth": "Ngày sinh",
	"completeInformation.dateOfBirth.required": "Bạn phải nhập ngày sinh",
	"completeInformation.address": "Địa chỉ*",
	"completeInformation.address.required": "Bạn phải nhập địa chỉ*",
	"completeInformation.gif": "Mã giới thiệu",
	"completeInformation.branch": "Chi nhánh*",
	"completeInformation.branch.required": "Bạn phải nhập chi nhánh",
	"completeInformation.accountNbr": "Số tài khoản*",
	"completeInformation.accountNbr.required": "Bạn phải nhập số tài khoản",
	"completeInformation.personalInfo": "Hộ chiếu*",
	"completeInformation.gender": "Giới tính",
	"completeInformation.province": "Tỉnh/Thành Phố*",
	"completeInformation.province.required": "Bạn phải chọn Tỉnh/Thành Phố",
	"completeInformation.district": "Quận/Huyện*",
	"completeInformation.district.required": "Bạn phải chọn Quận/Huyện",
	"completeInformation.ward": "Phường/Xã*",
	"completeInformation.wards.required": "Bạn phải chọnPhường/Xã",
	"completeInformation.bank": "Ngân hàng*",
	"completeInformation.bank.required": "Bạn phải chọn Ngân hàng*",
	"completeInformation.back": "Quay lại",
	"completeInformation.done": "Hoàn thành"
};

var BaseFormGroup = function BaseFormGroup(_ref) {
  var fieldName = _ref.fieldName,
      errors = _ref.errors,
      touched = _ref.touched,
      messageId = _ref.messageId,
      type = _ref.type,
      _ref$isRequired = _ref.isRequired,
      isRequired = _ref$isRequired === void 0 ? true : _ref$isRequired;
  return /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, {
    className: "form-label-group position-relative"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: messageId
  }, function (msg) {
    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(formik.Field, {
      type: type,
      name: fieldName,
      className: "form-control " + (isRequired && errors[fieldName] && touched[fieldName] && 'is-invalid'),
      placeholder: msg
    }), isRequired && errors[fieldName] && touched[fieldName] ? /*#__PURE__*/React__default.createElement("div", {
      className: "text-danger"
    }, errors[fieldName]) : null, /*#__PURE__*/React__default.createElement(reactstrap.Label, null, msg));
  }));
};

var BaseFormGroup$1 = React__default.memo(BaseFormGroup);

var DatePicker = function DatePicker(props) {
  return /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, {
    className: "form-label-group position-relative"
  }, /*#__PURE__*/React__default.createElement(Flatpickr, props), /*#__PURE__*/React__default.createElement(reactstrap.Label, null, props.placeholder), !props.notRequired && props.errors[props.fieldName] && props.touched[props.fieldName] ? /*#__PURE__*/React__default.createElement("div", {
    className: "text-danger"
  }, props.errors[props.fieldName]) : null);
};

var BaseFormDatePicker = function BaseFormDatePicker(_ref) {
  var fieldName = _ref.fieldName,
      errors = _ref.errors,
      touched = _ref.touched,
      messageId = _ref.messageId,
      value = _ref.value,
      options = _ref.options,
      intl = _ref.intl,
      _ref$isRequired = _ref.isRequired,
      isRequired = _ref$isRequired === void 0 ? true : _ref$isRequired;
  var defaultOptions = {
    dateFormat: 'm/d/Y'
  };
  return /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement(formik.FastField, {
    name: fieldName
  }, function (_ref2) {
    var form = _ref2.form;
    return /*#__PURE__*/React__default.createElement(DatePicker, {
      className: "bg-white form-control position-relative " + (isRequired && errors[fieldName] && touched[fieldName] && 'is-invalid'),
      placeholder: intl.formatMessage({
        id: messageId
      }),
      fieldName: fieldName,
      notRequired: !isRequired,
      errors: errors,
      touched: touched,
      value: value,
      options: options || defaultOptions,
      onChange: function onChange(date) {
        form.setFieldValue(fieldName, date[0]);
      }
    });
  }));
};

var BaseFormDatePicker$1 = React__default.memo(reactIntl.injectIntl(BaseFormDatePicker));

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
  })), props.required ? props.errors[props.fieldName] && props.touched[props.fieldName] ? /*#__PURE__*/React__default.createElement("div", {
    className: "text-danger"
  }, props.errors[props.fieldName]) : null : '', /*#__PURE__*/React__default.createElement("input", {
    className: "d-none",
    placeholder: props.placeholder,
    value: inputValue
  }), /*#__PURE__*/React__default.createElement(reactstrap.Label, {
    className: classnames({
      'text-primary': isFocused
    })
  }, props.placeholder));
};

var BaseFormGroupSelect = function BaseFormGroupSelect(_ref) {
  var fieldName = _ref.fieldName,
      errors = _ref.errors,
      touched = _ref.touched,
      messageId = _ref.messageId,
      options = _ref.options,
      intl = _ref.intl,
      defaultValue = _ref.defaultValue,
      _ref$isRequired = _ref.isRequired,
      isRequired = _ref$isRequired === void 0 ? true : _ref$isRequired;
  return /*#__PURE__*/React__default.createElement(formik.FastField, {
    name: "fieldName"
  }, function (_ref2) {
    var form = _ref2.form;
    return /*#__PURE__*/React__default.createElement(Select, {
      placeholder: intl.formatMessage({
        id: messageId
      }),
      className: "" + (isRequired && errors[fieldName] && touched[fieldName] && 'is-invalid'),
      classNamePrefix: "Select",
      fieldName: fieldName,
      required: isRequired,
      defaultValue: defaultValue,
      errors: errors,
      touched: touched,
      options: options,
      onChange: function onChange(e) {
        form.setFieldValue(fieldName, e.value);
      }
    });
  });
};

var BaseFormGroupSelect$1 = React__default.memo(reactIntl.injectIntl(BaseFormGroupSelect));

var validationSchema = Yup.object().shape({
  icType: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "completeInformation.nbrPer.required"
  })),
  icNumber: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "completeInformation.nbrPer.required"
  })).when('icType', {
    is: 'CMND',
    then: Yup.string().matches(/^(\d{9}|\d{12})$/, function () {
      return /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "completeInformation.nbrPer.invalid"
      });
    })
  }).when('icType', {
    is: 'CCCD',
    then: Yup.string().matches(/^(\d{12})$/, function () {
      return /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "completeInformation.nbrPer.invalid"
      });
    })
  }).when('icType', {
    is: 'HC',
    then: Yup.string().matches(/^(?!^0+$)[a-zA-Z0-9]{3,20}$/, function () {
      return /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "completeInformation.nbrPer.invalid"
      });
    })
  }),
  dateOfBirth: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "completeInformation.dateOfBirth.required"
  })),
  address: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "completeInformation.address.required"
  })),
  bankName: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "completeInformation.bank.required"
  })),
  bankBranch: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "completeInformation.branch.required"
  })),
  bankNumber: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "completeInformation.accountNbr.required"
  })),
  city: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "completeInformation.city.required"
  })),
  ward: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "completeInformation.ward.required"
  })),
  district: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "completeInformation.district.required"
  }))
});
var bank = [{
  value: '1',
  label: 'Tien Phong Bank'
}, {
  value: '2',
  label: 'Vietcombank'
}, {
  value: '3',
  label: 'BIDV'
}];
var city = [{
  value: 'HN',
  label: 'Hà Nội'
}, {
  value: 'TPHCM',
  label: 'Thành phố HCM'
}, {
  value: 'DN',
  label: 'Đà nẵng'
}];
var district = [{
  value: 'HN',
  label: 'Nam Từ Liêm'
}, {
  value: 'TPHCM',
  label: 'Thành phố HCM'
}, {
  value: 'DN',
  label: 'Đà nẵng'
}];
var wards = [{
  value: 'HN',
  label: 'Phạm Hùng'
}, {
  value: 'TPHCM',
  label: 'Lưu Hữu Phước'
}, {
  value: 'DN',
  label: 'Mễ Trì'
}];

var UserAccountTab = function UserAccountTab() {
  var _useSelector = reactRedux.useSelector(function (state) {
    return state.auth.user;
  }),
      userDetails = _useSelector.userDetails,
      userSettings = _useSelector.userSettings,
      user = _objectWithoutPropertiesLoose(_useSelector, ["userDetails", "userSettings"]);

  userDetails = userDetails || {};
  userSettings = userSettings || {};
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
    src: userSettings ? userSettings.avatar : '',
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
  }, user.fullName), /*#__PURE__*/React__default.createElement("div", null, "M\xE3 t\xE0i kho\u1EA3n : ", user.userCode), /*#__PURE__*/React__default.createElement("div", {
    className: "d-flex flex-wrap"
  }, /*#__PURE__*/React__default.createElement(reactstrap.Button.Ripple, {
    className: "mr-1 mt-2",
    color: "primary",
    outline: true
  }, "Change"), /*#__PURE__*/React__default.createElement(reactstrap.Button.Ripple, {
    className: "mt-2",
    color: "danger",
    outline: true
  }, "Remove Avatar"))))), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
    sm: "12"
  }, /*#__PURE__*/React__default.createElement(formik.Formik, {
    enableReinitialize: true,
    validationSchema: validationSchema,
    initialValues: {
      fullName: user.fullName || '',
      icNumber: user.icNumber || '',
      dateOfBirth: user.dateOfBirth || '',
      gender: user.gender || 'MALE',
      city: userDetails.city || '',
      district: userDetails.district || '',
      ward: userDetails.ward || '',
      address: userDetails.address || '',
      bankName: userDetails.bankName || '',
      bankBranch: userDetails.bankBranch || '',
      bankNumber: userDetails.bankNumber || ''
    }
  }, function (_ref) {
    var errors = _ref.errors,
        touched = _ref.touched;
    return /*#__PURE__*/React__default.createElement(formik.Form, null, /*#__PURE__*/React__default.createElement(reactstrap.Row, {
      className: "mt-2"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "12",
      md: "6"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroup$1, {
      messageId: "resgister.fullName",
      fieldName: "fullName",
      errors: errors,
      touched: touched
    })), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "12",
      md: "6"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroup$1, {
      messageId: "completeInformation.nbrPer",
      fieldName: "icNumber",
      errors: errors,
      touched: touched
    }))), /*#__PURE__*/React__default.createElement(reactstrap.Row, {
      className: "mt-2"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "12",
      md: "6"
    }, /*#__PURE__*/React__default.createElement(BaseFormDatePicker$1, {
      messageId: "completeInformation.dateOfBirth",
      fieldName: "dateOfBirth",
      errors: errors,
      touched: touched
    })), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "12",
      md: "6"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroupSelect$1, {
      messageId: "completeInformation.gender",
      fieldName: "gender",
      defaultValue: GENDER_OPTIONS[0],
      options: GENDER_OPTIONS,
      errors: errors,
      touched: touched
    }))), /*#__PURE__*/React__default.createElement(reactstrap.Row, {
      className: "mt-2"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "12",
      md: "6"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroup$1, {
      messageId: "register.phoneNumber",
      fieldName: "phoneNumber",
      errors: errors,
      touched: touched
    })), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "12",
      md: "6"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroup$1, {
      messageId: "register.email",
      fieldName: "email",
      errors: errors,
      touched: touched
    }))), /*#__PURE__*/React__default.createElement(reactstrap.Row, {
      className: "mt-2"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "12"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroup$1, {
      messageId: "completeInformation.address",
      fieldName: "address",
      errors: errors,
      touched: touched
    }))), /*#__PURE__*/React__default.createElement(reactstrap.Row, {
      className: "mt-2"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "4"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroupSelect$1, {
      messageId: "completeInformation.province",
      fieldName: "city",
      options: city,
      errors: errors,
      touched: touched
    })), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "4"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroupSelect$1, {
      messageId: "completeInformation.district",
      fieldName: "district",
      options: district,
      errors: errors,
      touched: touched
    })), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "4"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroupSelect$1, {
      messageId: "completeInformation.ward",
      fieldName: "ward",
      options: wards,
      errors: errors,
      touched: touched
    }))), /*#__PURE__*/React__default.createElement(reactstrap.Row, {
      className: "mt-2"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "4"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroupSelect$1, {
      messageId: "completeInformation.bank",
      fieldName: "bankName",
      options: bank,
      errors: errors,
      touched: touched
    })), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "4"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroup$1, {
      messageId: "completeInformation.branch",
      fieldName: "bankBranch",
      errors: errors,
      touched: touched
    })), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "4"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroup$1, {
      messageId: "completeInformation.accountNbr",
      fieldName: "bankNumber",
      errors: errors,
      touched: touched
    }))), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      className: "d-flex justify-content-end flex-wrap mt-2",
      sm: "12"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Button.Ripple, {
      type: "button",
      color: "secondary"
    }, "Trang ch\u1EE7"), /*#__PURE__*/React__default.createElement(reactstrap.Button.Ripple, {
      className: "ml-3",
      type: "submit",
      color: "primary"
    }, "L\u01B0u thay \u0111\u1ED5i")));
  }), /*#__PURE__*/React__default.createElement(reactstrap.Row, null)));
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

  var history = reactRouterDom.useHistory();
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
      history.push('/account-info');
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
      history.push('/change-password');
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
  var _useState = React.useState(null),
      rememberMe = _useState[0],
      setRememberMe = _useState[1];

  var _useState2 = React.useState(false),
      isRemeberMe = _useState2[0],
      setIsRemeberMe = _useState2[1];

  var dispatch = reactRedux.useDispatch();
  var loginStatus = reactRedux.useSelector(function (state) {
    return state.auth.loginStatus;
  });
  React.useEffect(function () {
    var user = JSON.parse(localStorage.getItem(REMEMBER_ME_TOKEN));

    if (user) {
      setRememberMe(user);
    }
  }, []);

  var onSubmit = function onSubmit(values, actions) {
    dispatch(loginAction({
      username: values.username,
      password: values.password,
      isRemeberMe: isRemeberMe
    }));
    actions.setSubmitting(false);
  };

  var onClickNotMe = function onClickNotMe() {
    localStorage.removeItem(REMEMBER_ME_TOKEN);
    setRememberMe(null);
  };

  var renderForm = function renderForm(_ref) {
    var errors = _ref.errors,
        touched = _ref.touched;
    return /*#__PURE__*/React__default.createElement(formik.Form, null, console.log('Render'), /*#__PURE__*/React__default.createElement("h4", {
      className: "text-center text-white mb-3"
    }, rememberMe ? /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "login.sayHi",
      values: {
        name: rememberMe.name
      }
    }) : /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "login.firstWelcome"
    }), loginStatus === LOGIN_STATUS.FAIL ? /*#__PURE__*/React__default.createElement("div", {
      className: "text-danger mt-1"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "login.fail"
    })) : ''), rememberMe ? '' : /*#__PURE__*/React__default.createElement(BaseFormGroup$1, {
      messageId: "login.username",
      fieldName: "username",
      errors: errors,
      touched: touched
    }), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, {
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
    }, rememberMe ? /*#__PURE__*/React__default.createElement("a", {
      onClick: onClickNotMe
    }, "Kh\xF4ng ph\u1EA3i t\xF4i") : /*#__PURE__*/React__default.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React__default.createElement(Icon.Check, {
        className: "vx-icon",
        size: 16
      }),
      label: /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "login.rememberMe"
      }),
      onChange: function onChange(e) {
        return setIsRemeberMe(e.target.checked);
      },
      defaultChecked: isRemeberMe
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
  };

  return /*#__PURE__*/React__default.createElement(formik.Formik, {
    enableReinitialize: true,
    initialValues: {
      username: rememberMe ? rememberMe.username : '',
      password: ''
    },
    render: renderForm,
    onSubmit: onSubmit,
    validationSchema: formSchema
  });
};

var formSchema$1 = Yup.object().shape({
  fullName: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "register.fullname.required"
  })),
  email: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "register.email.required"
  })).email( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "register.email.invalid"
  })),
  phoneNumber: Yup.string().matches(PHONE_REGEX, function () {
    return /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "register.phoneNumber.invalid"
    });
  }).required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "register.phoneNumber.required"
  })),
  refCode: Yup.string().length(10, function () {
    return /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "register.referalCode.invalid"
    });
  }).matches(PHONE_REGEX, function () {
    return /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "register.referalCode.invalid"
    });
  })
});

var Register = function Register() {
  var _useState = React.useState(false),
      isAppcepted = _useState[0],
      setIsAppcepted = _useState[1];

  var _useState2 = React.useState(false),
      isNotApccepted = _useState2[0],
      setIsNotAccepted = _useState2[1];

  var history = reactRouterDom.useHistory();

  var onSubmit = function onSubmit(values) {
    try {
      if (!isAppcepted) {
        setIsNotAccepted(true);
        return Promise.resolve();
      }

      return Promise.resolve(AuthService.register(values)).then(function (res) {
        if (res.status === 200 && res.data) {
          reactToastify.toast.success( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
            id: "register.registerSuccess"
          }));
          history.push('/login');
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var ontoggleAccepted = function ontoggleAccepted(checked) {
    setIsAppcepted(checked);
    setIsNotAccepted(!checked);
  };

  var renderForm = function renderForm(_ref) {
    var errors = _ref.errors,
        touched = _ref.touched;
    return /*#__PURE__*/React__default.createElement(formik.Form, null, /*#__PURE__*/React__default.createElement(BaseFormGroup$1, {
      fieldName: "fullName",
      errors: errors,
      touched: touched,
      messageId: "register.fullname"
    }), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, {
      className: "form-label-group position-relative"
    }, /*#__PURE__*/React__default.createElement(formik.Field, {
      name: "email",
      className: "form-control " + (errors.email && touched.email && 'is-invalid'),
      placeholder: "Email *"
    }), errors.email && touched.email ? /*#__PURE__*/React__default.createElement("div", {
      className: "text-danger"
    }, errors.email) : null, /*#__PURE__*/React__default.createElement(reactstrap.Label, null, "Email *")), /*#__PURE__*/React__default.createElement(BaseFormGroup$1, {
      fieldName: "phoneNumber",
      errors: errors,
      touched: touched,
      messageId: "register.phoneNumber"
    }), /*#__PURE__*/React__default.createElement(BaseFormGroup$1, {
      fieldName: "refCode",
      errors: errors,
      touched: touched,
      messageId: "register.refCode"
    }), /*#__PURE__*/React__default.createElement(reactstrap.FormGroup, null, /*#__PURE__*/React__default.createElement("div", {
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
    }), /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "register.agreeWith"
    }), ' ', /*#__PURE__*/React__default.createElement("a", {
      className: "text-primary"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "register.policyAndCondition"
    })), ' ', /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "register.useService"
    }))), isNotApccepted ? /*#__PURE__*/React__default.createElement("div", {
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
  };

  return /*#__PURE__*/React__default.createElement(formik.Formik, {
    initialValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      refCode: ''
    },
    render: renderForm,
    onSubmit: onSubmit,
    validationSchema: formSchema$1
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
  var _useState = React.useState(false),
      isModalOpen = _useState[0],
      setIsOpenModal = _useState[1];

  var _useState2 = React.useState(''),
      emailSuggestion = _useState2[0],
      setEmailSuggestion = _useState2[1];

  var dispatch = reactRedux.useDispatch();

  var onSubmit = function onSubmit(values, actions) {
    dispatch(forgotPassword(values));
  };

  var onClickSuggestion = function onClickSuggestion(username) {
    try {
      return Promise.resolve(AuthService.getSuggestionEmail(username)).then(function (res) {
        if (res.status === 200) {
          setEmailSuggestion(res.data);
          toggleModal();
        }
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var toggleModal = function toggleModal() {
    setIsOpenModal(!isModalOpen);
  };

  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(formik.Formik, {
    initialValues: {
      username: '',
      email: ''
    },
    onSubmit: onSubmit,
    validationSchema: formSchema$2
  }, function (_ref) {
    var errors = _ref.errors,
        touched = _ref.touched,
        values = _ref.values;
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
      }, errors.email) : null, values.username ? /*#__PURE__*/React__default.createElement("div", {
        className: "form-control-position text-primary cursor-pointer",
        onClick: function onClick() {
          return onClickSuggestion(values.username);
        }
      }, /*#__PURE__*/React__default.createElement(Icon.Sun, {
        size: 15
      })) : '', /*#__PURE__*/React__default.createElement(reactstrap.Label, null, msg));
    })), /*#__PURE__*/React__default.createElement("div", {
      className: "d-flex justify-content-center"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Button, {
      color: "primary",
      type: "submit"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "forgotPassword.verify"
    }))));
  }), /*#__PURE__*/React__default.createElement(reactstrap.Modal, {
    isOpen: isModalOpen,
    toggle: toggleModal,
    className: "modal-dialog-centered"
  }, /*#__PURE__*/React__default.createElement(reactstrap.ModalBody, {
    className: "modal-dialog-centered"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "w-100"
  }, /*#__PURE__*/React__default.createElement("div", null, !emailSuggestion ? /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "forgotPassword.notFoundEmailSuggestion"
  }) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "forgotPassword.yourEmailIs"
  }), ":", ' ', /*#__PURE__*/React__default.createElement("b", null, emailSuggestion))), /*#__PURE__*/React__default.createElement("br", null), /*#__PURE__*/React__default.createElement("div", {
    className: "d-flex justify-content-end"
  }, /*#__PURE__*/React__default.createElement(reactstrap.Button.Ripple, {
    color: "primary",
    onClick: toggleModal
  }, "OK"), ' ')))));
};

var formSchema$3 = Yup.object().shape({
  password: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "createPassword.password.required"
  })).matches(PASSWORD_REGEX, function () {
    return /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "createPassword.password.invalid"
    });
  }),
  passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "createPassword.passwordMustMatch"
  })).required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "createPassword.password.required"
  }))
});

var CreatePassword = function CreatePassword(_ref) {
  var isLanding2 = _ref.isLanding2;
  var history = reactRouterDom.useHistory();
  var dispatch = reactRedux.useDispatch();
  React.useEffect(function () {
    isLanding2 ? setRegisterToken() : setResetPassword();
  }, []);

  var onClickContinue = function onClickContinue(values) {
    if (isLanding2) {
      dispatch(createPassword(values.password));
    } else {
      dispatch(resetPassword(values.password));
    }
  };

  var setRegisterToken = function setRegisterToken() {
    var code = new URLSearchParams(document.location.search).get('registerToken');

    if (code) {
      dispatch(saveRegisterToken(code));
      history.push(history.location.pathname);
    }
  };

  var setResetPassword = function setResetPassword() {
    var code = new URLSearchParams(document.location.search).get('resetToken');

    if (code) {
      dispatch(saveResetPasswordToken(code));
      history.push(history.location.pathname);
    }
  };

  return /*#__PURE__*/React__default.createElement(formik.Formik, {
    initialValues: {
      password: '',
      passwordConfirmation: ''
    },
    onSubmit: onClickContinue,
    validationSchema: formSchema$3
  }, function (_ref2) {
    var errors = _ref2.errors,
        touched = _ref2.touched;
    return /*#__PURE__*/React__default.createElement(formik.Form, null, /*#__PURE__*/React__default.createElement("div", {
      className: "text-center mb-3"
    }, /*#__PURE__*/React__default.createElement("h4", {
      className: isLanding2 ? 'font-weight-boild' : 'font-weight-boild text-white'
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "createPassword.title"
    }))), /*#__PURE__*/React__default.createElement(BaseFormGroup$1, {
      type: "password",
      messageId: "login.password",
      fieldName: "password",
      errors: errors,
      touched: touched
    }), /*#__PURE__*/React__default.createElement(BaseFormGroup$1, {
      type: "password",
      messageId: "createPassword.enterThePassword",
      fieldName: "passwordConfirmation",
      errors: errors,
      touched: touched
    }), /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "createPassword.condition.1"
    })), /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "createPassword.condition.2"
    })), /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "createPassword.condition.3"
    })), /*#__PURE__*/React__default.createElement("div", {
      className: "d-flex justify-content-center mt-2"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Button, {
      color: "primary",
      type: "submit"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: isLanding2 ? 'createPassword.continutes' : 'createPassword.done'
    }))));
  });
};

var LandingHeader = function LandingHeader(_ref) {
  var isLanding2 = _ref.isLanding2;
  return /*#__PURE__*/React__default.createElement(Context.Consumer, null, function (context) {
    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("img", {
      src: isLanding2 ? IMAGE.LOGO : IMAGE.LOGO_WHITE,
      alt: "logo"
    }), /*#__PURE__*/React__default.createElement("div", {
      className: "languages d-flex align-items-center "
    }, /*#__PURE__*/React__default.createElement("div", {
      onClick: function onClick() {
        return context.switchLanguage('vi');
      },
      className: classnames('mr-1 cursor-pointer font-weight-bold', {
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
      className: classnames('mr-1 cursor-pointer font-weight-bold', {
        'text-primary': context.state.locale === 'en'
      })
    }, "ENG")));
  });
};

var LandingFooter = function LandingFooter() {
  return /*#__PURE__*/React__default.createElement("div", {
    className: "ld-footer px-1 px-md-3 px-lg-5 my-3"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "d-none d-lg-flex justify-content-between"
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
  })))), /*#__PURE__*/React__default.createElement("div", {
    className: "d-block d-lg-none text-center"
  }, /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("div", {
    className: "d-flex justify-content-center"
  }, /*#__PURE__*/React__default.createElement("a", {
    className: "mr-1",
    href: "https://www.apple.com/app-store/",
    target: "_blank"
  }, /*#__PURE__*/React__default.createElement("img", {
    className: "w-90",
    src: IMAGE.DOWNLOAD_APP_IOS,
    alt: "DOWNLOAD ON APP STORE"
  })), /*#__PURE__*/React__default.createElement("a", {
    href: "https://play.google.com/store/apps",
    target: "_blank"
  }, /*#__PURE__*/React__default.createElement("img", {
    className: "w-90",
    src: IMAGE.DOWNLOAD_APP_ANDROID,
    alt: "DOWNLOAD ON APP I"
  }))), /*#__PURE__*/React__default.createElement("div", {
    className: "mt-1"
  }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "footer.copyRight"
  })), /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "footer.companySlogan"
  })))));
};

var size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
};
var devices = {
  tablet: "(max-width: " + size.tablet + ")"
};

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n  .landing-page {\n    background-image: url('", "');\n\n    @media ", " {\n      background-image: url('", "');\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var PagetStyle = styled.div(_templateObject(), IMAGE.LANDING_PAGE_BG, devices.tablet, IMAGE.LANDING_PAGE_TABLET_BG);

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

      case 'reset-password':
        return /*#__PURE__*/React__default.createElement(CreatePassword, null);

      default:
        return '';
    }
  };

  var goToLink = function goToLink(link) {
    return history.push(link);
  };

  return /*#__PURE__*/React__default.createElement(PagetStyle, null, /*#__PURE__*/React__default.createElement("div", {
    className: "landing-page"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "position-absolute w-100"
  }), /*#__PURE__*/React__default.createElement("div", {
    className: "ld-main ml-auto col-12 col-md-6 col-xl-4"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "ld-header d-flex justify-content-between mb-1 mb-md-3 mb-xl-5"
  }, /*#__PURE__*/React__default.createElement(LandingHeader, null)), /*#__PURE__*/React__default.createElement("div", {
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
  }, /*#__PURE__*/React__default.createElement(TabView, null))), /*#__PURE__*/React__default.createElement(LandingFooter, null)));
};

var CompleteInforValidate = Yup.object().shape({
  icType: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "completeInformation.nbrPer.required"
  })),
  icNumber: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "completeInformation.nbrPer.required"
  })).when('icType', {
    is: 'CMND',
    then: Yup.string().matches(/^(\d{9}|\d{12})$/, function () {
      return /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "completeInformation.nbrPer.invalid"
      });
    })
  }).when('icType', {
    is: 'CCCD',
    then: Yup.string().matches(/^(\d{12})$/, function () {
      return /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "completeInformation.nbrPer.invalid"
      });
    })
  }).when('icType', {
    is: 'HC',
    then: Yup.string().matches(/^(?!^0+$)[a-zA-Z0-9]{3,20}$/, function () {
      return /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
        id: "completeInformation.nbrPer.invalid"
      });
    })
  }),
  dateOfBirth: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "completeInformation.dateOfBirth.required"
  })),
  address: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "completeInformation.address.required"
  })),
  bankName: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "completeInformation.bank.required"
  })),
  bankBranch: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "completeInformation.branch.required"
  })),
  bankNumber: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "completeInformation.accountNbr.required"
  })),
  city: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "completeInformation.city.required"
  })),
  ward: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "completeInformation.ward.required"
  })),
  district: Yup.string().required( /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
    id: "completeInformation.district.required"
  }))
});
var personalInfoOptions = [{
  value: 'HC',
  label: 'Hộ chiếu',
  color: '#338955',
  isFixed: true
}, {
  value: 'CMND',
  label: 'Chứng minh nhân dân',
  color: '#338955',
  isFixed: true
}, {
  value: 'CCCD',
  label: 'Căn cước công dân',
  color: '#338955',
  isFixed: true
}];
var bank$1 = [{
  value: '1',
  label: 'Tien Phong Bank'
}, {
  value: '2',
  label: 'Vietcombank'
}, {
  value: '3',
  label: 'BIDV'
}];
var city$1 = [{
  value: 'HN',
  label: 'Hà Nội'
}, {
  value: 'TPHCM',
  label: 'Thành phố HCM'
}, {
  value: 'DN',
  label: 'Đà nẵng'
}];
var district$1 = [{
  value: 'HN',
  label: 'Nam Từ Liêm'
}, {
  value: 'TPHCM',
  label: 'Thành phố HCM'
}, {
  value: 'DN',
  label: 'Đà nẵng'
}];
var wards$1 = [{
  value: 'HN',
  label: 'Phạm Hùng'
}, {
  value: 'TPHCM',
  label: 'Lưu Hữu Phước'
}, {
  value: 'DN',
  label: 'Mễ Trì'
}];

var CompleteInformation = function CompleteInformation(_ref) {
  var user = reactRedux.useSelector(function (state) {
    return state.auth.register.user;
  });
  var dispatch = reactRedux.useDispatch();

  var onSubmit = function onSubmit(values, actions) {
    dispatch(compeleteInfo(values));
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: "completeInfor"
  }, /*#__PURE__*/React__default.createElement(formik.Formik, {
    initialValues: {
      icType: '',
      icNumber: '',
      dateOfBirth: '',
      gender: 'MALE',
      city: '',
      district: '',
      ward: '',
      address: '',
      refCode: '',
      bankName: '',
      bankBranch: '',
      bankNumber: ''
    },
    validationSchema: CompleteInforValidate,
    onSubmit: onSubmit
  }, function (_ref2) {
    var errors = _ref2.errors,
        touched = _ref2.touched;
    return /*#__PURE__*/React__default.createElement(formik.Form, null, /*#__PURE__*/React__default.createElement(reactstrap.Row, null, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "12",
      lg: "3",
      className: "mb-3"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Row, {
      className: "ml-2"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      className: "font-weight-bold"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "register.fullname"
    }))), /*#__PURE__*/React__default.createElement(reactstrap.Row, {
      className: "ml-3"
    }, /*#__PURE__*/React__default.createElement("span", {
      className: "text-gray"
    }, user.fullName)), /*#__PURE__*/React__default.createElement(reactstrap.Row, {
      className: "ml-2  mt-2"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      className: "font-weight-bold"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "register.phoneNumber"
    }))), /*#__PURE__*/React__default.createElement(reactstrap.Row, {
      className: "ml-3"
    }, /*#__PURE__*/React__default.createElement("span", {
      className: "text-gray"
    }, user.phoneNumber)), /*#__PURE__*/React__default.createElement(reactstrap.Row, {
      className: "ml-2  mt-2"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Label, {
      className: "font-weight-bold"
    }, "Email*")), /*#__PURE__*/React__default.createElement(reactstrap.Row, {
      className: "ml-3"
    }, /*#__PURE__*/React__default.createElement("span", {
      className: "text-gray"
    }, user.email))), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "12",
      lg: "9"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Row, null, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "6"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroupSelect$1, {
      messageId: "completeInformation.idType",
      fieldName: "icType",
      options: personalInfoOptions,
      errors: errors,
      touched: touched
    })), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "6"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroup$1, {
      messageId: "completeInformation.nbrPer",
      fieldName: "icNumber",
      errors: errors,
      touched: touched
    }))), /*#__PURE__*/React__default.createElement(reactstrap.Row, null, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "6"
    }, /*#__PURE__*/React__default.createElement(BaseFormDatePicker$1, {
      messageId: "completeInformation.dateOfBirth",
      fieldName: "dateOfBirth",
      errors: errors,
      touched: touched
    })), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "6"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroupSelect$1, {
      messageId: "completeInformation.gender",
      fieldName: "gender",
      defaultValue: GENDER_OPTIONS[0],
      options: GENDER_OPTIONS,
      errors: errors,
      touched: touched
    }))), /*#__PURE__*/React__default.createElement(reactstrap.Row, null, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "4"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroupSelect$1, {
      messageId: "completeInformation.province",
      fieldName: "city",
      options: city$1,
      errors: errors,
      touched: touched
    })), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "4"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroupSelect$1, {
      messageId: "completeInformation.district",
      fieldName: "district",
      options: district$1,
      errors: errors,
      touched: touched
    })), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "4"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroupSelect$1, {
      messageId: "completeInformation.ward",
      fieldName: "ward",
      options: wards$1,
      errors: errors,
      touched: touched
    }))), /*#__PURE__*/React__default.createElement(reactstrap.Row, null, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "8"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroup$1, {
      messageId: "completeInformation.address",
      fieldName: "address",
      errors: errors,
      touched: touched
    })), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "4"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroup$1, {
      messageId: "completeInformation.gif",
      fieldName: "refCode",
      isRequired: false
    }))), /*#__PURE__*/React__default.createElement(reactstrap.Row, null, /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "4"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroupSelect$1, {
      messageId: "completeInformation.bank",
      fieldName: "bankName",
      options: bank$1,
      errors: errors,
      touched: touched
    })), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "4"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroup$1, {
      messageId: "completeInformation.branch",
      fieldName: "bankBranch",
      errors: errors,
      touched: touched
    })), /*#__PURE__*/React__default.createElement(reactstrap.Col, {
      sm: "4"
    }, /*#__PURE__*/React__default.createElement(BaseFormGroup$1, {
      messageId: "completeInformation.accountNbr",
      fieldName: "bankNumber",
      errors: errors,
      touched: touched
    }))), /*#__PURE__*/React__default.createElement("div", {
      className: "d-flex justify-content-center justify-content-md-end"
    }, /*#__PURE__*/React__default.createElement(reactRouterDom.Link, {
      to: "/create-password"
    }, /*#__PURE__*/React__default.createElement(reactstrap.Button.Ripple, {
      type: "button"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "completeInformation.back"
    }))), /*#__PURE__*/React__default.createElement(reactstrap.Button.Ripple, {
      type: "submit",
      className: "ml-2"
    }, /*#__PURE__*/React__default.createElement(reactIntl.FormattedMessage, {
      id: "completeInformation.done"
    }))))));
  }));
};

var CompleteInformation$1 = reactIntl.injectIntl(CompleteInformation);

var LandingPage2 = function LandingPage2(props) {
  var _useState = React.useState(''),
      activeTab = _useState[0],
      setActiveTab = _useState[1];

  var history = reactRouterDom.useHistory();
  React.useEffect(function () {
    setActiveTab(props.activeTab || 'create-password');
  }, [props.activeTab]);

  var TabView = function TabView() {
    switch (activeTab) {
      case 'create-password':
        return /*#__PURE__*/React__default.createElement("div", {
          className: "col-12 col-md-10 cpl-lg-8 mx-auto"
        }, /*#__PURE__*/React__default.createElement(CreatePassword, {
          isLanding2: true
        }));

      case 'complete-information':
        return /*#__PURE__*/React__default.createElement(CompleteInformation$1, {
          isLanding2: true
        });

      default:
        return '';
    }
  };

  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: "landing-page",
    style: {
      backgroundImage: "url('" + IMAGE.LANDING_PAGE_2_BG + "')"
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "col-11 mx-auto mb-5"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "ld-main2"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "ld-header d-flex justify-content-between  mb-5"
  }, /*#__PURE__*/React__default.createElement(LandingHeader, {
    isLanding2: true
  })), /*#__PURE__*/React__default.createElement("div", {
    className: classnames('lg-content p-2 p-md-4 p-lg-5 col-12 mx-auto', {
      'col-lg-6 col-md-8': activeTab !== 'complete-information'
    })
  }, /*#__PURE__*/React__default.createElement(TabView, null)))), /*#__PURE__*/React__default.createElement(LandingFooter, null)));
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
      checkLoginStatus(code);
    }

    if (authToken) {
      loadNavtigation(appId);
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
  }, {
    path: 'reset-password'
  }];
  var landingPage2Routes = [{
    path: 'create-password'
  }, {
    path: 'provide-new-password'
  }, {
    path: 'complete-information'
  }];
  return /*#__PURE__*/React__default.createElement(IntlProviderWrapper, {
    appMessage: appMessage
  }, /*#__PURE__*/React__default.createElement(reactRouterDom.Router, {
    history: history
  }, /*#__PURE__*/React__default.createElement(reactRouterDom.Switch, null, /*#__PURE__*/React__default.createElement(reactRouterDom.Route, {
    path: "/",
    render: function render(props) {
      return isAuthentication ? /*#__PURE__*/React__default.createElement(Layout$1, _extends({}, props, {
        appId: appId
      }), /*#__PURE__*/React__default.createElement(reactRouterDom.Switch, null, settingRoutes.map(function (item) {
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
      }), landingPage2Routes.map(function (item) {
        return /*#__PURE__*/React__default.createElement(reactRouterDom.Route, {
          key: item.path,
          path: "/" + item.path,
          render: function render() {
            return /*#__PURE__*/React__default.createElement(LandingPage2, {
              activeTab: item.path
            });
          }
        });
      }), /*#__PURE__*/React__default.createElement(reactRouterDom.Redirect, {
        from: "/",
        to: "/login"
      }));
    }
  }))), /*#__PURE__*/React__default.createElement(reactToastify.ToastContainer, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true
  }));
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

var LoadingSpinner = function LoadingSpinner() {
  var _useSelector = reactRedux.useSelector(function (state) {
    return state.ui;
  }),
      isLoading = _useSelector.isLoading;

  return isLoading ? /*#__PURE__*/React__default.createElement(TopBarProgress, null) : null;
};

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
      apiBaseUrl = _ref.apiBaseUrl,
      history = _ref.history;
  var middlewares = [thunk, createDebounce()];
  var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux.compose;
  var store = redux.createStore(rootReducer(appReducer), {}, composeEnhancers(redux.applyMiddleware.apply(void 0, middlewares)));
  var persistor = reduxPersist.persistStore(store);
  setBaseHistory(history);
  setUpHttpClient(store, apiBaseUrl);
  return /*#__PURE__*/React__default.createElement(reactRedux.Provider, {
    store: store
  }, /*#__PURE__*/React__default.createElement(react.PersistGate, {
    loading: null,
    persistor: persistor
  }, /*#__PURE__*/React__default.createElement(LoadingSpinner, null), /*#__PURE__*/React__default.createElement(AppRouter$1, {
    message: message,
    appId: appId,
    history: history,
    children: children
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
      className: "fallback-spinner"
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

Object.defineProperty(exports, 'toast', {
  enumerable: true,
  get: function () {
    return reactToastify.toast;
  }
});
Object.defineProperty(exports, 'FormattedMessage', {
  enumerable: true,
  get: function () {
    return reactIntl.FormattedMessage;
  }
});
Object.defineProperty(exports, 'Button', {
  enumerable: true,
  get: function () {
    return reactstrap.Button;
  }
});
exports.AppId = AppId;
exports.AutoComplete = Autocomplete;
exports.BaseApp = App;
exports.BaseFormDatePicker = BaseFormDatePicker$1;
exports.BaseFormGroup = BaseFormGroup$1;
exports.BaseFormGroupSelect = BaseFormGroupSelect$1;
exports.Checkbox = CheckBox;
exports.DatePicker = DatePicker;
exports.FallbackSpinner = FallbackSpinner;
exports.HttpClient = HttpClient;
exports.Radio = Radio;
exports.Select = Select;
exports.useDeviceDetect = useDeviceDetect;
exports.useWindowDimensions = useWindowDimensions;
//# sourceMappingURL=index.js.map
