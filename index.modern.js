import React, { useState, useEffect, Component, PureComponent } from 'react';
import { connect, useSelector as useSelector$1, useDispatch, Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import createDebounce from 'redux-debounced';
import thunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react';
import { persistReducer, persistStore } from 'redux-persist';
import Axios from 'axios';
import * as Icon from 'react-feather';
import { AlertTriangle, ShoppingCart, FileText, Circle, User, DollarSign, TrendingUp, Award, CreditCard, Share2, Settings, Lock, Power, Search, X, Bell, PlusSquare, DownloadCloud, CheckCircle, File, Menu, Home, List, PlusCircle, Gift, MessageSquare, ArrowUp, Disc, ChevronRight, Check, MapPin, Info, Sun } from 'react-feather';
import { toast, ToastContainer } from 'react-toastify';
export { toast } from 'react-toastify';
import { throttleAdapterEnhancer, cacheAdapterEnhancer } from 'axios-extensions';
import { FormattedMessage, injectIntl, IntlProvider } from 'react-intl';
export { FormattedMessage } from 'react-intl';
import { createBrowserHistory } from 'history';
import sessionStorage from 'redux-persist/es/storage/session';
import { useHistory, NavLink as NavLink$1, Link, Router, Switch, Route, Redirect } from 'react-router-dom';
import classnames from 'classnames';
import { FormGroup, Label, DropdownMenu, DropdownItem, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, Badge, Media, Navbar as Navbar$1, Button, Row, Col, Form, Input, Table, Card, CardHeader, CardTitle, CardBody, Nav, TabContent, TabPane } from 'reactstrap';
export { Button } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ScrollToTop from 'react-scroll-up';
import Hammer from 'react-hammerjs';
import Select$1 from 'react-select';
import chroma from 'chroma-js';
import Flatpickr from 'react-flatpickr';
import { Field, Formik, Form as Form$1, FastField } from 'formik';
import { object, string, ref } from 'yup';
import TopBarProgress from 'react-topbar-progress-indicator';
import Ripples from 'react-ripples';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import 'prismjs/themes/prism-tomorrow.css';

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
};

const API_BASE_URL = 'http://localhost:8086/nth';
const API_LOGIN_URL = 'http://localhost:8086/api/authenticate';
const API_LOGOUT_URL = 'http://localhost:8086/api/authenticate';
const API_REGISTER = '/onboarding/api/authenticate/register';
const API_GET_USER = '/user/api/users';
const API_GET_NAV_CONFIGS = '/accesscontrol/api/roles';
const API_CREATE_PASSWORD = '/onboarding/api/authenticate/create-new-password';
const API_R_200 = 200;
const MAX_MOBILE_WIDTH = 768;
const MAX_TABLET_WIDTH = 1024;
const REMEMBER_ME_TOKEN = 'rememberMe';
const LOGIN_STATUS = {
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL'
};
const APP_URL = 'http://localhost:3000';
const IMAGE = {
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

const HttpClient = Axios.create({
  timeout: 10000,
  adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(Axios.defaults.adapter, {
    threshold: 15 * 60 * 1000
  }))
});
HttpClient.defaults.headers['Content-Type'] = 'application/json';
const errorMessage = message => {
  return /*#__PURE__*/React.createElement("div", {
    className: "d-flex align-items-center"
  }, /*#__PURE__*/React.createElement(AlertTriangle, null), " ", /*#__PURE__*/React.createElement("span", {
    className: "ml-1"
  }, message));
};
const setUpHttpClient = (store, apiBaseUrl) => {
  let deviceId = localStorage.getItem('deviceId');
  let language = localStorage.getItem('language');

  if (!deviceId) {
    deviceId = generateUUID();
    localStorage.setItem('deviceId', deviceId);
  }

  if (!language) {
    localStorage.setItem('language', 'vi');
  }

  HttpClient.defaults.baseURL = apiBaseUrl || API_BASE_URL;
  HttpClient.interceptors.request.use(config => {
    const token = store.getState().auth.authToken;
    language = localStorage.getItem('language');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
  HttpClient.interceptors.response.use(response => {
    store.dispatch({
      type: 'HIDE_LOADING_BAR'
    });
    return response;
  }, e => {
    store.dispatch({
      type: 'HIDE_LOADING_BAR'
    });

    if (!e.response) {
      return e;
    }

    switch (e.response.status) {
      case 403:
        toast.error(errorMessage(e.response.data.message));
        store.dispatch({
          type: 'LOGOUT_ACTION'
        });

      case 400:
      case 500:
        toast.error(errorMessage(e.response.data.message));
    }

    return e.response;
  });
};

const themeConfig = {
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

const customizerReducer = (state = { ...themeConfig
}, action) => {
  switch (action.type) {
    case 'CHANGE_MODE':
      return { ...state,
        theme: action.mode
      };

    case 'COLLAPSE_SIDEBAR':
      return { ...state,
        sidebarCollapsed: action.value
      };

    case 'CHANGE_NAVBAR_COLOR':
      return { ...state,
        navbarColor: action.color
      };

    case 'CHANGE_NAVBAR_TYPE':
      return { ...state,
        navbarType: action.style
      };

    case 'CHANGE_FOOTER_TYPE':
      return { ...state,
        footerType: action.style
      };

    case 'CHANGE_MENU_COLOR':
      return { ...state,
        menuTheme: action.style
      };

    case 'HIDE_SCROLL_TO_TOP':
      return { ...state,
        hideScrollToTop: action.value
      };

    case 'SHOW_LOADING_BAR':
      return { ...state,
        showLoadingBar: true
      };

    case 'HIDE_LOADING_BAR':
      return { ...state,
        showLoadingBar: false
      };

    default:
      return state;
  }
};

let history = createBrowserHistory({
  basename: ''
});
const setBaseHistory = appHistory => {
  history = appHistory;
};

class AuthService {}

AuthService.login = user => {
  return HttpClient.post(API_LOGIN_URL, user);
};

AuthService.getUserInfo = (username, authToken) => {
  const headers = {
    Authorization: `Bearer ${authToken}`
  };
  return HttpClient.get(`${API_GET_USER}/${username}`, {
    headers
  });
};

AuthService.logout = user => {
  return HttpClient.post(API_LOGOUT_URL, user);
};

AuthService.createPassword = (password, registerToken) => {
  return HttpClient.post(API_CREATE_PASSWORD, {
    password,
    registerToken
  });
};

AuthService.register = user => {
  return HttpClient.post(API_REGISTER, user);
};

AuthService.checkLoginByToken = () => {
  return HttpClient.get(API_LOGIN_URL);
};

const LOGIN_ACTION = 'LOGIN_ACTION';
const LOGIN_FAIL_ACTION = 'LOGIN_FAIL_ACTION';
const LOGOUT_ACTION = 'LOGOUT_ACTION';
const SAVE_REGISTER_TOKEN = 'SAVE_REGISTER_TOKEN';
const checkLoginStatus = authToken => {
  return async (dispatch, getState) => {
    try {
      let respone = await AuthService.checkLoginByToken();

      if (respone.status === API_R_200) {
        respone = await AuthService.getUserInfo(getState().auth.user.username, authToken);
        dispatch({
          type: LOGIN_ACTION,
          payload: {
            authToken,
            user: respone.data || {}
          }
        });
        history.push(history.location.pathname);
      } else {
        dispatch({
          type: LOGIN_ACTION,
          payload: {
            authToken: 'authToken',
            user: {}
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
const loginAction = user => {
  return async dispatch => {
    try {
      let respone = await AuthService.login(user);

      if (respone.status === API_R_200) {
        const authToken = respone.data.id_token;
        respone = await AuthService.getUserInfo(user.username, authToken);

        if (user.isRemeberMe) {
          localStorage.setItem(REMEMBER_ME_TOKEN, JSON.stringify({
            username: user.username,
            name: respone.data.fullName
          }));
        }

        dispatch({
          type: LOGIN_ACTION,
          payload: {
            authToken,
            user: respone.data || []
          }
        });
        history.push('/');
      } else {
        const token = {
          authToken: 'authToken',
          user: {}
        };
        dispatch({
          type: LOGIN_ACTION,
          payload: token
        });
        toast.error(errorMessage( /*#__PURE__*/React.createElement(FormattedMessage, {
          id: "login.fail"
        })));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
const createPassword = (password, registerToken) => {
  return async () => {
    try {
      const respone = await AuthService.createPassword(password, registerToken);

      if (respone.status === 200 && respone.data) {
        history.push('/complete-information', {
          state: {
            registerToken
          }
        });
      }
    } catch (error) {}
  };
};
const saveRegisterToken = registerToken => {
  return dispatch => dispatch({
    type: SAVE_REGISTER_TOKEN,
    payload: registerToken
  });
};
const logoutAction = () => {
  return async dispatch => {
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
  };
};

const authInitialState = {
  authToken: '',
  user: '',
  loginStatus: '',
  registerToken: ''
};
const authReducers = (state = { ...authInitialState
}, action) => {
  switch (action.type) {
    case LOGIN_ACTION:
      {
        return { ...state,
          ...action.payload,
          loginStatus: LOGIN_STATUS.SUCCESS
        };
      }

    case LOGOUT_ACTION:
      {
        return { ...authInitialState
        };
      }

    case LOGIN_FAIL_ACTION:
      {
        return { ...state,
          loginStatus: LOGIN_STATUS.FAIL
        };
      }

    case SAVE_REGISTER_TOKEN:
      {
        return { ...state,
          registerToken: payload
        };
      }

    default:
      return state;
  }
};

const AppId = {
  APP_NO1: 'APP_NO1',
  INSURANCE_APP: 'INSURANCE_APP',
  SUPPLEMENT_APP: 'SUPPLEMENT_APP'
};

const navigationConfig = [{
  id: 'buyInsurance',
  appId: AppId.INSURANCE_APP,
  type: 'item',
  title: 'menu.buyInsurance',
  icon: /*#__PURE__*/React.createElement(ShoppingCart, {
    size: 20
  }),
  navLink: '/buy-insurance'
}, {
  id: 'contractManagement',
  appId: AppId.INSURANCE_APP,
  title: 'menu.contractManagement',
  icon: /*#__PURE__*/React.createElement(FileText, {
    size: 20
  }),
  permissions: ['admin', 'editor'],
  navLink: '/contracts',
  type: 'collapse',
  children: [{
    id: 'personalContracts',
    type: 'item',
    title: 'menu.personalContracts',
    icon: /*#__PURE__*/React.createElement(Circle, {
      size: 20
    }),
    navLink: '/contracts/personal'
  }, {
    id: 'partnerContracts',
    type: 'item',
    title: 'menu.partnerContracts',
    icon: /*#__PURE__*/React.createElement(Circle, {
      size: 20
    }),
    navLink: '/contracts/partner'
  }, {
    id: 'allContracts',
    type: 'item',
    title: 'menu.allContracts',
    icon: /*#__PURE__*/React.createElement(Circle, {
      size: 20
    }),
    navLink: '/contracts/all'
  }]
}, {
  id: 'account',
  appId: AppId.APP_NO1,
  title: 'menu.account',
  icon: /*#__PURE__*/React.createElement(User, {
    size: 20
  }),
  permissions: ['admin', 'editor'],
  navLink: '/accounts',
  type: 'collapse',
  children: [{
    id: 'createAccount',
    type: 'item',
    title: 'menu.createAccount',
    icon: /*#__PURE__*/React.createElement(Circle, {
      size: 20
    }),
    navLink: '/accounts/create'
  }, {
    id: 'accountManagement',
    type: 'item',
    title: 'menu.accountManagement',
    icon: /*#__PURE__*/React.createElement(Circle, {
      size: 20
    }),
    navLink: '/accounts/management'
  }]
}, {
  id: 'insuranceFeeManagement',
  appId: AppId.INSURANCE_APP,
  title: 'menu.insuranceFeeManagement',
  icon: /*#__PURE__*/React.createElement(DollarSign, {
    size: 20
  }),
  permissions: ['admin', 'editor'],
  navLink: '/insurance-fee',
  type: 'collapse',
  children: [{
    id: 'systemFee',
    type: 'item',
    title: 'menu.systemFee',
    icon: /*#__PURE__*/React.createElement(Circle, {
      size: 20
    }),
    navLink: '/insurance-fee/system'
  }, {
    id: 'personalFee',
    type: 'item',
    title: 'menu.personalFee',
    icon: /*#__PURE__*/React.createElement(Circle, {
      size: 20
    }),
    navLink: '/insurance-fee/personal'
  }, {
    id: 'partnerFee',
    type: 'item',
    title: 'menu.partnerFee',
    icon: /*#__PURE__*/React.createElement(Circle, {
      size: 20
    }),
    navLink: '/insurance-fee/partner'
  }, {
    id: 'allFee',
    type: 'item',
    title: 'menu.allFee',
    icon: /*#__PURE__*/React.createElement(Circle, {
      size: 20
    }),
    navLink: '/insurance-fee/all'
  }]
}, {
  id: 'bonusManagement',
  appId: AppId.SUPPLEMENT_APP,
  title: 'menu.bonusManagement',
  icon: /*#__PURE__*/React.createElement(TrendingUp, {
    size: 20
  }),
  permissions: ['admin', 'editor'],
  navLink: '/bonus',
  type: 'collapse',
  children: [{
    id: 'systemBonus',
    type: 'item',
    title: 'menu.systemBonus',
    icon: /*#__PURE__*/React.createElement(Circle, {
      size: 20
    }),
    navLink: '/bonus/system'
  }, {
    id: 'personalBonus',
    type: 'item',
    title: 'menu.personalBonus',
    icon: /*#__PURE__*/React.createElement(Circle, {
      size: 20
    }),
    navLink: '/bonus/personal'
  }, {
    id: 'partnerBonus',
    type: 'item',
    title: 'menu.partnerBonus',
    icon: /*#__PURE__*/React.createElement(Circle, {
      size: 20
    }),
    navLink: '/bonus/partner'
  }, {
    id: 'allBonus',
    type: 'item',
    title: 'menu.allBonus',
    icon: /*#__PURE__*/React.createElement(Circle, {
      size: 20
    }),
    navLink: '/bonus/all'
  }]
}, {
  id: 'insuranceCertificate',
  appId: AppId.INSURANCE_APP,
  type: 'item',
  title: 'menu.insuranceCertificate',
  icon: /*#__PURE__*/React.createElement(Award, {
    size: 20
  }),
  permissions: ['admin', 'editor'],
  navLink: '/insurance-certificate',
  type: 'collapse',
  children: [{
    id: 'newImport',
    type: 'item',
    title: 'menu.insuranceCertificate.newImport',
    icon: /*#__PURE__*/React.createElement(Circle, {
      size: 20
    }),
    navLink: '/insurance-certificate/new-import'
  }, {
    id: 'newExport',
    type: 'item',
    title: 'menu.insuranceCertificate.newImport',
    icon: /*#__PURE__*/React.createElement(Circle, {
      size: 20
    }),
    navLink: '/insurance-certificate/new-export'
  }, {
    id: 'wrongImport',
    type: 'item',
    title: 'menu.insuranceCertificate.wrongImport',
    icon: /*#__PURE__*/React.createElement(Circle, {
      size: 20
    }),
    navLink: '/insurance-certificate/wrong-import'
  }, {
    id: 'wrongExport',
    type: 'item',
    title: 'menu.insuranceCertificate.wrongExport',
    icon: /*#__PURE__*/React.createElement(Circle, {
      size: 20
    }),
    navLink: '/insurance-certificate/wrong-export'
  }]
}, {
  id: 'debt',
  appId: AppId.SUPPLEMENT_APP,
  title: 'menu.debt',
  icon: /*#__PURE__*/React.createElement(CreditCard, {
    size: 20
  }),
  permissions: ['admin', 'editor'],
  type: 'collapse',
  navLink: '/debt',
  children: [{
    id: 'createDebt',
    type: 'item',
    title: 'menu.createDebt',
    icon: /*#__PURE__*/React.createElement(Circle, {
      size: 20
    }),
    navLink: '/debt/create'
  }, {
    id: 'debtManagement',
    type: 'item',
    title: 'menu.debtManagement',
    icon: /*#__PURE__*/React.createElement(Circle, {
      size: 20
    }),
    navLink: '/debt/management'
  }]
}, {
  id: 'permissionGoup',
  appId: AppId.SUPPLEMENT_APP,
  type: 'collapse',
  title: 'menu.permissionGoup',
  icon: /*#__PURE__*/React.createElement(Share2, {
    size: 20
  }),
  permissions: ['admin', 'editor'],
  navLink: '/permission-group',
  children: [{
    id: 'creatPermissionGoup',
    type: 'item',
    title: 'menu.creatPermissionGoup',
    icon: /*#__PURE__*/React.createElement(Circle, {
      size: 20
    }),
    navLink: '/permission-group/create'
  }, {
    id: 'permissionGoupManagement',
    type: 'item',
    title: 'menu.permissionGoupManagement',
    icon: /*#__PURE__*/React.createElement(Circle, {
      size: 20
    }),
    navLink: '/permission-group/management'
  }]
}];

const mapRoleListToNavConfigs = (roleList = []) => {
  roleList = roleList.filter(item => item.order < 1000);
  const mapRoles = new Map();
  roleList.forEach(role => {
    const listRole = mapRoles.get(role.parentId);
    const itemNav = mapRoleToNavItem(role);

    if (listRole) {
      listRole.push(itemNav);
      mapRoles.set(role.parentId, listRole);
    } else {
      mapRoles.set(role.parentId, [itemNav]);
    }
  });
  const parentList = mapRoles.get(null);
  return parentList.map(item => {
    item.children = mapRoles.get(item.id + '');
    return item;
  });
};

const mapRoleToNavItem = role => {
  const IconTag = Icon[role.icon];
  const item = {};
  item.id = role.id;
  item.type = 'item';
  item.code = role.code;
  item.appId = role.appId;
  item.title = `menu.${role.keyLang}`;
  item.icon = /*#__PURE__*/React.createElement(IconTag, {
    size: 20
  });
  item.navLink = role.menuPath;

  if (role.isHighlight) {
    item.badge = 'primary';
    item.badgeText = 'new';
  }

  return item;
};

const getNativgationConfig = (appId, navConfigs) => {
  if (!navConfigs) {
    navConfigs = [...navigationConfig];
  } else {
    navConfigs = mapRoleListToNavConfigs(navConfigs);
  }

  return navConfigs.map(item => {
    item.isExternalApp = item.appId !== appId;

    if (item.children) {
      item.children.map(child => child.isExternalApp = child.appId !== appId);

      if (item.children.length === 1) {
        item.navLink = item.children[0].navLink;
      } else {
        item.type = 'collapse';
      }
    }

    return item;
  });
};

class NavBarService {}

NavBarService.getNativagtion = () => {
  return HttpClient.get(API_GET_NAV_CONFIGS, {
    isBackgroundRequest: true
  });
};

const LOAD_NATIVGATION = 'LOAD_NATIVGATION';

const initialState = {
  navConfigs: [],
  roles: []
};

const navbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NATIVGATION:
      return { ...state,
        ...action.payload
      };

    default:
      return state;
  }
};

const rootReducer = appReducer => combineReducers({
  customizer: customizerReducer,
  auth: persistReducer({
    storage: sessionStorage,
    key: 'root',
    blacklist: ['loginStatus']
  }, authReducers),
  navbar: navbarReducer,
  app: appReducer
});

class Autocomplete extends React.Component {
  constructor(props) {
    super(props);

    this.onSuggestionItemClick = (item, e) => {
      if (this.props.onSuggestionClick) {
        this.props.onSuggestionClick(item, e);
      }

      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: e.currentTarget.innerText
      });
    };

    this.onSuggestionItemHover = index => {
      this.setState({
        activeSuggestion: index
      });
    };

    this.onChange = e => {
      const userInput = e.currentTarget.value;
      this.setState({
        activeSuggestion: 0,
        showSuggestions: true,
        userInput
      });

      if (e.target.value < 1) {
        this.setState({
          showSuggestions: false
        });
      }
    };

    this.onInputClick = e => {
      e.stopPropagation();
    };

    this.onKeyDown = e => {
      const {
        activeSuggestion,
        showSuggestions,
        userInput
      } = this.state;
      const filterKey = this.props.filterKey;
      let suggestionList = ReactDOM.findDOMNode(this.suggestionList);

      if (e.keyCode === 38 && activeSuggestion !== 0) {
        this.setState({
          activeSuggestion: activeSuggestion - 1
        });

        if (e.target.value.length > -1 && suggestionList !== null && activeSuggestion <= this.filteredData.length / 2) {
          suggestionList.scrollTop = 0;
        }
      } else if (e.keyCode === 40 && activeSuggestion < this.filteredData.length - 1) {
          this.setState({
            activeSuggestion: activeSuggestion + 1
          });

          if (e.target.value.length > -1 && suggestionList !== null && activeSuggestion >= this.filteredData.length / 2) {
            suggestionList.scrollTop = suggestionList.scrollHeight;
          }
        } else if (e.keyCode === 27) {
            this.setState({
              showSuggestions: false,
              userInput: ''
            });
          } else if (e.keyCode === 13 && showSuggestions) {
              this.onSuggestionItemClick(this.filteredData[activeSuggestion], e);
              this.setState({
                userInput: this.filteredData[activeSuggestion][filterKey],
                showSuggestions: false
              });
            } else {
              return;
            }

      if (this.props.onKeyDown !== undefined && this.props.onKeyDown !== null && this.props.onKeyDown) {
        this.props.onKeyDown(e, userInput);
      }
    };

    this.renderGroupedSuggestion = arr => {
      const {
        filterKey,
        customRender
      } = this.props;
      const {
        onSuggestionItemClick,
        onSuggestionItemHover,
        state: {
          activeSuggestion,
          userInput
        }
      } = this;

      let renderSuggestion = (item, i) => {
        if (!customRender) {
          return /*#__PURE__*/React.createElement("li", {
            className: classnames('suggestion-item', {
              active: this.filteredData.indexOf(item) === activeSuggestion
            }),
            key: item[filterKey],
            onClick: e => onSuggestionItemClick(item, e),
            onMouseEnter: () => {
              this.onSuggestionItemHover(this.filteredData.indexOf(item));
            }
          }, item[filterKey]);
        } else if (customRender) {
          return customRender(item, i, this.filteredData, activeSuggestion, onSuggestionItemClick, onSuggestionItemHover, userInput);
        } else {
          return null;
        }
      };

      return arr.map((item, i) => {
        return renderSuggestion(item, i);
      });
    };

    this.renderUngroupedSuggestions = () => {
      const {
        filterKey,
        suggestions,
        customRender,
        suggestionLimit
      } = this.props;
      const {
        onSuggestionItemClick,
        onSuggestionItemHover,
        state: {
          activeSuggestion,
          userInput
        }
      } = this;
      this.filteredData = [];
      let sortSingleData = suggestions.filter(i => {
        let startCondition = i[filterKey].toLowerCase().startsWith(userInput.toLowerCase()),
            includeCondition = i[filterKey].toLowerCase().includes(userInput.toLowerCase());

        if (startCondition) {
          return startCondition;
        } else if (!startCondition && includeCondition) {
          return includeCondition;
        } else {
          return null;
        }
      }).slice(0, suggestionLimit);
      this.filteredData.push(...sortSingleData);
      return sortSingleData.map((suggestion, index) => {
        if (!customRender) {
          return /*#__PURE__*/React.createElement("li", {
            className: classnames('suggestion-item', {
              active: this.filteredData.indexOf(suggestion) === activeSuggestion
            }),
            key: suggestion[filterKey],
            onClick: e => onSuggestionItemClick(suggestion, e),
            onMouseEnter: () => this.onSuggestionItemHover(this.filteredData.indexOf(suggestion))
          }, suggestion[filterKey]);
        } else if (customRender) {
          return customRender(suggestion, index, this.filteredData, activeSuggestion, onSuggestionItemClick, onSuggestionItemHover, userInput);
        } else {
          return null;
        }
      });
    };

    this.renderSuggestions = () => {
      const {
        filterKey,
        grouped,
        filterHeaderKey,
        suggestions
      } = this.props;
      const {
        renderUngroupedSuggestions,
        state: {
          userInput
        }
      } = this;

      if (grouped === undefined || grouped === null || !grouped) {
        return renderUngroupedSuggestions();
      } else {
        this.filteredData = [];
        return suggestions.map(suggestion => {
          let sortData = suggestion.data.filter(i => {
            let startCondition = i[filterKey].toLowerCase().startsWith(userInput.toLowerCase()),
                includeCondition = i[filterKey].toLowerCase().includes(userInput.toLowerCase());

            if (startCondition) {
              return startCondition;
            } else if (!startCondition && includeCondition) {
              return includeCondition;
            } else {
              return null;
            }
          }).slice(0, suggestion.searchLimit);
          this.filteredData.push(...sortData);
          return /*#__PURE__*/React.createElement(React.Fragment, {
            key: suggestion[filterHeaderKey]
          }, /*#__PURE__*/React.createElement("li", {
            className: "suggestion-item suggestion-title text-primary text-bold-600"
          }, suggestion[filterHeaderKey]), sortData.length ? this.renderGroupedSuggestion(sortData) : /*#__PURE__*/React.createElement("li", {
            className: "suggestion-item no-result"
          }, /*#__PURE__*/React.createElement(AlertTriangle, {
            size: 15
          }), ' ', /*#__PURE__*/React.createElement("span", {
            className: "align-middle ml-50"
          }, "No Result")));
        });
      }
    };

    this.clearInput = val => {
      if (this.props.clearInput && !val) {
        this.setState({
          userInput: ''
        });
      }
    };

    this.handleExtenalClick = e => {
      let {
        container
      } = this.refs;
      const {
        target
      } = e;

      if (target !== container && !container.contains(target)) {
        this.setState({
          showSuggestions: false
        });
        if (this.props.externalClick) this.props.externalClick(e);
      }
    };

    this.state = {
      activeSuggestion: 0,
      showSuggestions: false,
      userInput: '',
      focused: false,
      openUp: false
    };
    this.filteredData = [];
    document.body.addEventListener('click', this.handleExtenalClick);
  }

  componentDidUpdate(prevProps, prevState) {
    let textInput = ReactDOM.findDOMNode(this.input);
    let {
      autoFocus,
      onSuggestionsShown,
      clearInput
    } = this.props;

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
  }

  componentDidMount() {
    if (this.props.defaultSuggestions && this.state.focused) {
      this.setState({
        showSuggestions: true
      });
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleExtenalClick);
  }

  render() {
    const {
      onChange,
      onKeyDown,
      state: {
        showSuggestions,
        userInput,
        openUp
      }
    } = this;
    let suggestionsListComponent;

    if (showSuggestions) {
      suggestionsListComponent = /*#__PURE__*/React.createElement(PerfectScrollbar, {
        className: classnames('suggestions-list', {
          'open-up': openUp
        }),
        ref: el => this.suggestionList = el,
        component: "ul",
        options: {
          wheelPropagation: false
        }
      }, this.renderSuggestions());
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "vx-autocomplete-container",
      ref: "container"
    }, /*#__PURE__*/React.createElement(FormGroup, {
      className: "form-label-group position-relative"
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      onChange: e => {
        onChange(e);

        if (this.props.onChange) {
          this.props.onChange(e);
        }
      },
      onKeyDown: e => onKeyDown(e),
      value: userInput,
      className: `vx-autocomplete-search ${this.props.className ? this.props.className : ''}`,
      placeholder: this.props.placeholder,
      onClick: this.onInputClick,
      ref: el => {
        return this.input = el;
      },
      onFocus: e => {
        this.setState({
          focused: true
        });
      },
      autoFocus: this.props.autoFocus,
      onBlur: e => {
        if (this.props.onBlur) this.props.onBlur(e);
        this.setState({
          focused: false
        });
      }
    }), /*#__PURE__*/React.createElement(Label, null, this.props.placeholder), suggestionsListComponent));
  }

}
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

const UserDropdown = props => {
  const {
    logoutAction
  } = props;
  const history = useHistory();

  const handleNavigation = (e, path) => {
    e.preventDefault();
    history.push(path);
  };

  return /*#__PURE__*/React.createElement(DropdownMenu, {
    right: true
  }, /*#__PURE__*/React.createElement(DropdownItem, {
    tag: "a",
    href: "#",
    onClick: e => handleNavigation(e, '/account-info')
  }, /*#__PURE__*/React.createElement(Settings, {
    size: 14,
    className: "mr-50"
  }), /*#__PURE__*/React.createElement("span", {
    className: "align-middle"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "setting.accountInformation"
  }))), /*#__PURE__*/React.createElement(DropdownItem, {
    tag: "a",
    href: "#",
    onClick: e => handleNavigation(e, '/change-password')
  }, /*#__PURE__*/React.createElement(Lock, {
    size: 14,
    className: "mr-50"
  }), /*#__PURE__*/React.createElement("span", {
    className: "align-middle"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "setting.changePassword"
  }))), /*#__PURE__*/React.createElement(DropdownItem, {
    divider: true
  }), /*#__PURE__*/React.createElement(DropdownItem, {
    tag: "a",
    href: "#",
    onClick: e => handleNavigation(e, '/terms-and-condition')
  }, /*#__PURE__*/React.createElement(Lock, {
    size: 14,
    className: "mr-50"
  }), /*#__PURE__*/React.createElement("span", {
    className: "align-middle"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "setting.termAndCondition"
  }))), /*#__PURE__*/React.createElement(DropdownItem, {
    tag: "a",
    href: "#",
    onClick: e => handleNavigation(e, '/privacy-policy')
  }, /*#__PURE__*/React.createElement(Lock, {
    size: 14,
    className: "mr-50"
  }), /*#__PURE__*/React.createElement("span", {
    className: "align-middle"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "setting.privacyPolicy"
  }))), /*#__PURE__*/React.createElement(DropdownItem, {
    tag: "a",
    href: "#",
    onClick: e => handleNavigation(e, '/language')
  }, /*#__PURE__*/React.createElement(Lock, {
    size: 14,
    className: "mr-50"
  }), /*#__PURE__*/React.createElement("span", {
    className: "align-middle"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "setting.language"
  }))), /*#__PURE__*/React.createElement(DropdownItem, {
    tag: "a",
    href: "#",
    onClick: e => handleNavigation(e, '/contact')
  }, /*#__PURE__*/React.createElement(Lock, {
    size: 14,
    className: "mr-50"
  }), /*#__PURE__*/React.createElement("span", {
    className: "align-middle"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "setting.contact"
  }))), /*#__PURE__*/React.createElement(DropdownItem, {
    divider: true
  }), /*#__PURE__*/React.createElement(DropdownItem, {
    tag: "a",
    onClick: logoutAction
  }, /*#__PURE__*/React.createElement(Power, {
    size: 14,
    className: "mr-50"
  }), /*#__PURE__*/React.createElement("span", {
    className: "align-middle"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "navbar.logout"
  }))));
};

class NavbarUser extends React.PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      navbarSearch: false,
      suggestions: []
    };

    this.handleNavbarSearch = () => {
      this.setState({
        navbarSearch: !this.state.navbarSearch
      });
    };

    this.getCountryCode = locale => {
      const countryCode = {
        en: 'us',
        vi: 'vn'
      };
      return countryCode[locale];
    };

    this.onSuggestionItemClick = item => {
      if (!item.isExternalApp) {
        history.push(`${item.menuPath}`);
      } else {
        window.location.href = item.navLinkExternal;
      }
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.roles !== this.props.roles) {
      const suggestions = this.props.roles.map(item => {
        item.name = this.props.intl.formatMessage({
          id: `menu.${item.keyLang}`
        });
        item.isExternalApp = item.appId !== this.props.appId;
        item.navLinkExternal = `${APP_URL + item.menuPath}?code=${this.props.authToken}`;
        return item;
      });
      this.setState({
        suggestions
      });
    }
  }

  render() {
    return /*#__PURE__*/React.createElement("ul", {
      className: "nav navbar-nav navbar-nav-user float-right"
    }, /*#__PURE__*/React.createElement(NavItem, {
      className: "nav-search",
      onClick: this.handleNavbarSearch
    }, /*#__PURE__*/React.createElement(NavLink, {
      className: "nav-link-search"
    }, /*#__PURE__*/React.createElement(Search, {
      size: 21,
      "data-tour": "search"
    })), /*#__PURE__*/React.createElement("div", {
      className: classnames('search-input', {
        open: this.state.navbarSearch,
        'd-none': this.state.navbarSearch === false
      })
    }, /*#__PURE__*/React.createElement("div", {
      className: "search-input-icon"
    }, /*#__PURE__*/React.createElement(Search, {
      size: 17,
      className: "primary"
    })), /*#__PURE__*/React.createElement(Autocomplete, {
      className: "form-control",
      suggestions: this.state.suggestions,
      filterKey: "name",
      onSuggestionClick: this.onSuggestionItemClick,
      autoFocus: true,
      clearInput: this.state.navbarSearch,
      externalClick: () => {
        this.setState({
          navbarSearch: false
        });
      },
      onKeyDown: e => {
        if (e.keyCode === 27 || e.keyCode === 13) {
          this.setState({
            navbarSearch: false
          });
          this.props.handleAppOverlay('');
        }
      },
      customRender: (item, i, filteredData, activeSuggestion, onSuggestionItemClick, onSuggestionItemHover) => {
        const IconTag = Icon[item.icon ? item.icon : 'X'];
        return /*#__PURE__*/React.createElement("li", {
          className: classnames('suggestion-item', {
            active: filteredData.indexOf(item) === activeSuggestion
          }),
          key: i,
          onClick: e => onSuggestionItemClick(item, e),
          onMouseEnter: () => onSuggestionItemHover(filteredData.indexOf(item))
        }, /*#__PURE__*/React.createElement("div", {
          className: "d-flex align-items-center"
        }, /*#__PURE__*/React.createElement(IconTag, {
          size: 17
        }), /*#__PURE__*/React.createElement("div", {
          className: "ml-2"
        }, item.name)));
      },
      onSuggestionsShown: userInput => {
        if (this.state.navbarSearch) {
          this.props.handleAppOverlay(userInput);
        }
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "search-input-close"
    }, /*#__PURE__*/React.createElement(X, {
      size: 24,
      onClick: e => {
        e.stopPropagation();
        this.setState({
          navbarSearch: false
        });
        this.props.handleAppOverlay('');
      }
    })))), /*#__PURE__*/React.createElement(UncontrolledDropdown, {
      tag: "li",
      className: "dropdown-notification nav-item"
    }, /*#__PURE__*/React.createElement(DropdownToggle, {
      tag: "a",
      className: "nav-link nav-link-label"
    }, /*#__PURE__*/React.createElement(Bell, {
      size: 21
    }), /*#__PURE__*/React.createElement(Badge, {
      pill: true,
      color: "primary",
      className: "badge-up"
    }, ' ', "5", ' ')), /*#__PURE__*/React.createElement(DropdownMenu, {
      tag: "ul",
      right: true,
      className: "dropdown-menu-media"
    }, /*#__PURE__*/React.createElement("li", {
      className: "dropdown-menu-header"
    }, /*#__PURE__*/React.createElement("div", {
      className: "dropdown-header mt-0"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "text-white"
    }, "5 New"), /*#__PURE__*/React.createElement("span", {
      className: "notification-title"
    }, "App Notifications"))), /*#__PURE__*/React.createElement(PerfectScrollbar, {
      className: "media-list overflow-hidden position-relative",
      options: {
        wheelPropagation: false
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "d-flex justify-content-between"
    }, /*#__PURE__*/React.createElement(Media, {
      className: "d-flex align-items-start"
    }, /*#__PURE__*/React.createElement(Media, {
      left: true,
      href: "#"
    }, /*#__PURE__*/React.createElement(PlusSquare, {
      className: "font-medium-5 primary",
      size: 21
    })), /*#__PURE__*/React.createElement(Media, {
      body: true
    }, /*#__PURE__*/React.createElement(Media, {
      heading: true,
      className: "primary media-heading",
      tag: "h6"
    }, "You have new order!"), /*#__PURE__*/React.createElement("p", {
      className: "notification-text"
    }, "Are your going to meet me tonight?")), /*#__PURE__*/React.createElement("small", null, /*#__PURE__*/React.createElement("time", {
      className: "media-meta",
      dateTime: "2015-06-11T18:29:20+08:00"
    }, "9 hours ago")))), /*#__PURE__*/React.createElement("div", {
      className: "d-flex justify-content-between"
    }, /*#__PURE__*/React.createElement(Media, {
      className: "d-flex align-items-start"
    }, /*#__PURE__*/React.createElement(Media, {
      left: true,
      href: "#"
    }, /*#__PURE__*/React.createElement(DownloadCloud, {
      className: "font-medium-5 success",
      size: 21
    })), /*#__PURE__*/React.createElement(Media, {
      body: true
    }, /*#__PURE__*/React.createElement(Media, {
      heading: true,
      className: "success media-heading",
      tag: "h6"
    }, "99% Server load"), /*#__PURE__*/React.createElement("p", {
      className: "notification-text"
    }, "You got new order of goods?")), /*#__PURE__*/React.createElement("small", null, /*#__PURE__*/React.createElement("time", {
      className: "media-meta",
      dateTime: "2015-06-11T18:29:20+08:00"
    }, "5 hours ago")))), /*#__PURE__*/React.createElement("div", {
      className: "d-flex justify-content-between"
    }, /*#__PURE__*/React.createElement(Media, {
      className: "d-flex align-items-start"
    }, /*#__PURE__*/React.createElement(Media, {
      left: true,
      href: "#"
    }, /*#__PURE__*/React.createElement(AlertTriangle, {
      className: "font-medium-5 danger",
      size: 21
    })), /*#__PURE__*/React.createElement(Media, {
      body: true
    }, /*#__PURE__*/React.createElement(Media, {
      heading: true,
      className: "danger media-heading",
      tag: "h6"
    }, "Warning Notification"), /*#__PURE__*/React.createElement("p", {
      className: "notification-text"
    }, "Server has used 99% of CPU")), /*#__PURE__*/React.createElement("small", null, /*#__PURE__*/React.createElement("time", {
      className: "media-meta",
      dateTime: "2015-06-11T18:29:20+08:00"
    }, "Today")))), /*#__PURE__*/React.createElement("div", {
      className: "d-flex justify-content-between"
    }, /*#__PURE__*/React.createElement(Media, {
      className: "d-flex align-items-start"
    }, /*#__PURE__*/React.createElement(Media, {
      left: true,
      href: "#"
    }, /*#__PURE__*/React.createElement(CheckCircle, {
      className: "font-medium-5 info",
      size: 21
    })), /*#__PURE__*/React.createElement(Media, {
      body: true
    }, /*#__PURE__*/React.createElement(Media, {
      heading: true,
      className: "info media-heading",
      tag: "h6"
    }, "Complete the task"), /*#__PURE__*/React.createElement("p", {
      className: "notification-text"
    }, "One of your task is pending.")), /*#__PURE__*/React.createElement("small", null, /*#__PURE__*/React.createElement("time", {
      className: "media-meta",
      dateTime: "2015-06-11T18:29:20+08:00"
    }, "Last week")))), /*#__PURE__*/React.createElement("div", {
      className: "d-flex justify-content-between"
    }, /*#__PURE__*/React.createElement(Media, {
      className: "d-flex align-items-start"
    }, /*#__PURE__*/React.createElement(Media, {
      left: true,
      href: "#"
    }, /*#__PURE__*/React.createElement(File, {
      className: "font-medium-5 warning",
      size: 21
    })), /*#__PURE__*/React.createElement(Media, {
      body: true
    }, /*#__PURE__*/React.createElement(Media, {
      heading: true,
      className: "warning media-heading",
      tag: "h6"
    }, "Generate monthly report"), /*#__PURE__*/React.createElement("p", {
      className: "notification-text"
    }, "Reminder to generate monthly report")), /*#__PURE__*/React.createElement("small", null, /*#__PURE__*/React.createElement("time", {
      className: "media-meta",
      dateTime: "2015-06-11T18:29:20+08:00"
    }, "Last month"))))), /*#__PURE__*/React.createElement("li", {
      className: "dropdown-menu-footer"
    }, /*#__PURE__*/React.createElement(DropdownItem, {
      tag: "a",
      className: "p-1 text-center"
    }, /*#__PURE__*/React.createElement("span", {
      className: "align-middle"
    }, "Read all notifications"))))), /*#__PURE__*/React.createElement(UncontrolledDropdown, {
      tag: "li",
      className: "dropdown-user nav-item"
    }, /*#__PURE__*/React.createElement(DropdownToggle, {
      tag: "a",
      className: "nav-link dropdown-user-link"
    }, /*#__PURE__*/React.createElement("div", {
      className: "user-nav d-sm-flex d-none"
    }, /*#__PURE__*/React.createElement("span", {
      className: "user-name text-bold-600"
    }, this.props.userName)), /*#__PURE__*/React.createElement("span", {
      "data-tour": "user"
    }, /*#__PURE__*/React.createElement("img", {
      src: "https://storage.live.com/Users/-6155523327610065665/MyProfile/ExpressionProfile/ProfilePhoto:Win8Static,UserTileMedium,UserTileStatic",
      className: "round",
      height: "40",
      width: "40",
      alt: "avatar"
    }))), /*#__PURE__*/React.createElement(UserDropdown, this.props)));
  }

}

var NavbarUser$1 = injectIntl(NavbarUser);

const ThemeNavbar = props => {
  const colorsArr = ['primary', 'danger', 'success', 'info', 'warning', 'dark'];
  const navbarTypes = ['floating', 'static', 'sticky', 'hidden'];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "content-overlay"
  }), /*#__PURE__*/React.createElement("div", {
    className: "header-navbar-shadow"
  }), /*#__PURE__*/React.createElement(Navbar$1, {
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
  }, /*#__PURE__*/React.createElement("div", {
    className: "navbar-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "navbar-container content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "navbar-collapse d-flex justify-content-between align-items-center",
    id: "navbar-mobile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bookmark-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mr-auto float-left bookmark-wrapper d-flex align-items-center"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "navbar-nav d-xl-none"
  }, /*#__PURE__*/React.createElement(NavItem, {
    className: "mobile-menu mr-auto"
  }, /*#__PURE__*/React.createElement(NavLink, {
    className: "nav-menu-main menu-toggle hidden-xs is-active",
    onClick: props.sidebarVisibility
  }, /*#__PURE__*/React.createElement(Menu, {
    className: "ficon"
  })))), /*#__PURE__*/React.createElement("ul", {
    className: "nav navbar-nav d-none d-xl-flex bookmark-icons"
  }, Array(5).fill(0).map((_, index) => /*#__PURE__*/React.createElement(NavItem, null, /*#__PURE__*/React.createElement("img", {
    className: "img-fluid",
    key: index,
    src: IMAGE[`NAV_ICON_${index + 1}`]
  })))))), /*#__PURE__*/React.createElement(NavbarUser$1, {
    handleAppOverlay: props.handleAppOverlay,
    changeCurrentLang: props.changeCurrentLang,
    appId: props.appId,
    authToken: props.authToken,
    userName: props.name,
    roles: props.roles,
    isAuthenticated: props.isAuthenticated,
    logoutAction: props.logoutAction
  }))))));
};

const mapStateToProps = state => {
  return {
    name: state.auth.user.fullName,
    isAuthenticated: !!state.auth.name,
    roles: state.navbar.roles,
    authToken: state.auth.authToken
  };
};

var Navbar = connect(mapStateToProps, {
  logoutAction
})(ThemeNavbar);

function getWindowDimensions() {
  const {
    innerWidth: width,
    innerHeight: height
  } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowDimensions;
}

const Footer = props => {
  const {
    width
  } = useWindowDimensions();
  const history = useHistory();
  const navConfigs = useSelector$1(state => [...state.navbar.navConfigs]);
  const authToken = useSelector$1(state => state.auth.authToken);

  const goToPage = (e, name) => {
    e.preventDefault();
    let currentRoute = navConfigs.find(item => item.code === name);

    if (!currentRoute) {
      currentRoute = {
        isExternalApp: AppId.APP_NO1 === props.AppId,
        navLink: ''
      };
    }

    if (!currentRoute.isExternalApp) {
      history.push(`${currentRoute.navLink}`);
    } else {
      window.location.href = `${APP_URL + currentRoute.navLink}?code=${authToken}`;
    }
  };

  return /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("div", {
    className: classnames('footer footer-light', {
      'd-none': width < MAX_MOBILE_WIDTH
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "float-md-left d-block d-md-inline-block mt-25"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "footer.copyRight"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "footer.companySlogan"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "float-md-right d-none d-md-block"
  }, /*#__PURE__*/React.createElement("a", {
    className: "mr-1",
    href: "https://www.apple.com/app-store/",
    target: "_blank"
  }, /*#__PURE__*/React.createElement("img", {
    src: IMAGE.DOWNLOAD_APP_IOS,
    alt: "DOWNLOAD ON APP STORE"
  })), /*#__PURE__*/React.createElement("a", {
    href: "https://play.google.com/store/apps",
    target: "_blank"
  }, /*#__PURE__*/React.createElement("img", {
    src: IMAGE.DOWNLOAD_APP_ANDROID,
    alt: "DOWNLOAD ON APP I"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: classnames('footer footer-light footer-mobile text-center', {
      'd-none': width >= MAX_MOBILE_WIDTH
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-25"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => goToPage(e, 'home')
  }, /*#__PURE__*/React.createElement(Home, null), /*#__PURE__*/React.createElement("div", {
    className: "mt-1"
  }, "Trang ch\u1EE7"))), /*#__PURE__*/React.createElement("div", {
    className: "w-25"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => goToPage(e, 'buyInsurance')
  }, /*#__PURE__*/React.createElement(List, null), /*#__PURE__*/React.createElement("div", {
    className: "mt-1"
  }, "H\u1EE3p \u0111\u1ED3ng"))), /*#__PURE__*/React.createElement("div", {
    className: "position-relative w-25"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => goToPage(e, 'contractManagemen')
  }, /*#__PURE__*/React.createElement("img", {
    src: IMAGE.BUY_INSURANCE,
    className: "buy-insurance",
    alt: ""
  }), /*#__PURE__*/React.createElement(PlusCircle, {
    style: {
      visibility: 'hidden'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "mt-1"
  }, "Mua b\u1EA3o hi\u1EC3m"))), /*#__PURE__*/React.createElement("div", {
    className: "w-25"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => goToPage(e, 'home')
  }, /*#__PURE__*/React.createElement(Gift, null), /*#__PURE__*/React.createElement("div", {
    className: "mt-1"
  }, "Khuy\u1EBFn m\u1EA1i"))), /*#__PURE__*/React.createElement("div", {
    className: "w-25"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => goToPage(e, 'home')
  }, /*#__PURE__*/React.createElement(MessageSquare, null), /*#__PURE__*/React.createElement("div", {
    className: "mt-1"
  }, "Li\xEAn h\u1EC7")))), props.hideScrollToTop === false ? /*#__PURE__*/React.createElement(ScrollToTop, {
    showUnder: 160
  }, /*#__PURE__*/React.createElement(Button, {
    color: "primary",
    className: "btn-icon scroll-top"
  }, /*#__PURE__*/React.createElement(ArrowUp, {
    size: 15
  }))) : null);
};

const changeMode = mode => {
  return dispatch => dispatch({
    type: "CHANGE_MODE",
    mode
  });
};
const collapseSidebar = value => {
  return dispatch => dispatch({
    type: "COLLAPSE_SIDEBAR",
    value
  });
};
const changeNavbarColor = color => {
  return dispatch => dispatch({
    type: "CHANGE_NAVBAR_COLOR",
    color
  });
};
const changeNavbarType = style => {
  return dispatch => dispatch({
    type: "CHANGE_NAVBAR_TYPE",
    style
  });
};
const changeFooterType = style => {
  return dispatch => dispatch({
    type: "CHANGE_FOOTER_TYPE",
    style
  });
};
const changeMenuColor = style => {
  return dispatch => dispatch({
    type: "CHANGE_MENU_COLOR",
    style
  });
};
const hideScrollToTop = value => {
  return dispatch => dispatch({
    type: "HIDE_SCROLL_TO_TOP",
    value
  });
};

class SidebarHeader extends Component {
  render() {
    let {
      toggleSidebarMenu,
      activeTheme,
      collapsed,
      sidebarState,
      toggle,
      sidebarVisibility,
      menuShadow
    } = this.props;
    return /*#__PURE__*/React.createElement("div", {
      className: "navbar-header"
    }, /*#__PURE__*/React.createElement("ul", {
      className: "nav navbar-nav flex-row"
    }, /*#__PURE__*/React.createElement("li", {
      className: "nav-item my-auto mr-auto"
    }, /*#__PURE__*/React.createElement(NavLink$1, {
      to: "/"
    }, /*#__PURE__*/React.createElement("img", {
      className: "img-fluid logo-img",
      src: !sidebarState || !collapsed ? IMAGE.LOGO : IMAGE.LOGO_NO_TEXT,
      alt: "logo"
    }))), /*#__PURE__*/React.createElement("li", {
      className: "nav-item nav-toggle"
    }, /*#__PURE__*/React.createElement("div", {
      className: "nav-link modern-nav-toggle"
    }, collapsed === false ? /*#__PURE__*/React.createElement(Disc, {
      onClick: () => {
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
    }) : /*#__PURE__*/React.createElement(Circle, {
      onClick: () => {
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
    }), /*#__PURE__*/React.createElement(X, {
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
    })))), /*#__PURE__*/React.createElement("div", {
      className: classnames('shadow-bottom', {
        'd-none': menuShadow === false
      })
    }));
  }

}

class SideMenuGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      activeItem: this.props.activePath
    };

    this.handleActiveItem = url => {
      this.setState({
        activeItem: url
      });
    };

    this.flag = true;
    this.parentArray = [];
    this.childObj = {};
  }

  componentDidUpdate(prevProps, prevState) {
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
  }

  renderChild(item, activeGroup, handleGroupClick, handleActiveItem, parent) {
    return /*#__PURE__*/React.createElement("ul", {
      className: "menu-content"
    }, item.children ? item.children.map(child => {
      const CustomAnchorTag = child.isExternalApp ? `a` : Link;

      if (!this.parentArray.includes(item.id) && this.flag) {
        this.parentArray.push(item.id);
      }

      if (child.navlink && child.collapsed) {
        this.props.collapsedMenuPaths(child.navLink);
      }

      if (this.props.activeItemState === child.navLink) {
        this.childObj = child;
        this.props.parentArr.push(this.parentArray);
        this.flag = false;
      }

      if (child.permissions && child.permissions.includes(this.props.currentUser) || child.permissions === undefined) {
        return /*#__PURE__*/React.createElement("li", {
          key: child.id,
          className: classnames({
            hover: this.props.hoverIndex === child.id,
            'has-sub': child.type === 'collapse',
            open: child.type === 'collapse' && activeGroup.includes(child.id),
            'sidebar-group-active': this.props.currentActiveGroup.includes(child.id),
            active: this.props.activeItemState === child.navLink && child.type === 'item' || item.parentOf && item.parentOf.includes(this.props.activeItemState),
            disabled: child.disabled
          }),
          onClick: e => {
            e.stopPropagation();
            handleGroupClick(child.id, item.id, child.type);

            if (child.navLink && child.navLink !== undefined) {
              handleActiveItem(child.navLink);
            }

            if (this.props.deviceWidth <= 1200 && child.type === 'item') {
              this.props.toggleMenu();
            }
          }
        }, /*#__PURE__*/React.createElement(CustomAnchorTag, {
          className: classnames({
            'd-flex justify-content-between': child.type === 'collapse'
          }),
          to: child.navLink && child.type === 'item' ? child.navLink : '',
          href: this.props.getItemLink(child),
          onMouseEnter: () => {
            this.props.handleSidebarMouseEnter(child.id);
          },
          onMouseLeave: () => {
            this.props.handleSidebarMouseEnter(child.id);
          },
          key: child.id,
          onClick: e => {
            return child.type === 'collapse' ? e.preventDefault() : '';
          },
          target: child.newTab ? '_blank' : undefined
        }, /*#__PURE__*/React.createElement("div", {
          className: "menu-text"
        }, child.icon, /*#__PURE__*/React.createElement("span", {
          className: "menu-item menu-title"
        }, /*#__PURE__*/React.createElement(FormattedMessage, {
          id: child.title
        }))), child.badge ? /*#__PURE__*/React.createElement(Badge, {
          color: child.badge,
          className: "float-right mr-2",
          pill: true
        }, child.badgeText) : '', child.type === 'collapse' ? /*#__PURE__*/React.createElement(ChevronRight, {
          className: "menu-toggle-icon",
          size: 13
        }) : ''), child.children ? this.renderChild(child, activeGroup, handleGroupClick, handleActiveItem, item.id) : '');
      } else if (child.navLink === this.props.activePath && !child.permissions.includes(this.props.currentUser)) {
        return this.props.redirectUnauthorized();
      } else {
        return null;
      }
    }) : null);
  }

  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, this.renderChild(this.props.group, this.props.activeGroup, this.props.handleGroupClick, this.props.handleActiveItem, null));
  }

}

class SideMenuContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: true,
      isHovered: false,
      activeGroups: [],
      currentActiveGroup: [],
      tempArr: []
    };

    this.handleGroupClick = (id, parent = null, type = '') => {
      let open_group = this.state.activeGroups;
      let active_group = this.state.currentActiveGroup;
      let temp_arr = this.state.tempArr;

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
          let temp = open_group.filter(function (obj) {
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

      this.setState({
        activeGroups: open_group,
        tempArr: temp_arr,
        currentActiveGroup: active_group
      });
    };

    this.initRender = parentArr => {
      this.setState({
        activeGroups: parentArr.slice(0),
        currentActiveGroup: parentArr.slice(0),
        flag: false
      });
    };

    this.getItemLink = item => {
      return item.isExternalApp ? `${APP_URL + item.navLink}?code=${this.props.currentUser.authToken}` : '';
    };

    this.parentArr = [];
    this.collapsedPath = null;
  }

  componentDidMount() {
    this.initRender(this.parentArr[0] || []);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.activePath !== this.props.activePath || prevProps.navConfigs !== this.props.navConfigs) {
      if (this.collapsedMenuPaths !== null) {
        this.props.collapsedMenuPaths(this.collapsedMenuPaths);
      }

      this.initRender(this.parentArr[0] ? this.parentArr[this.parentArr.length - 1] : []);
    }
  }

  render() {
    const menuItems = this.props.navConfigs.map(item => {
      const CustomAnchorTag = item.isExternalApp ? `a` : Link;

      if (item.type === 'groupHeader') {
        return /*#__PURE__*/React.createElement("li", {
          className: "navigation-header",
          key: `group-header-${item.groupTitle}`
        }, /*#__PURE__*/React.createElement("span", null, item.groupTitle));
      }

      let renderItem = /*#__PURE__*/React.createElement("li", {
        className: classnames('nav-item', {
          'has-sub': item.type === 'collapse',
          open: this.state.activeGroups.includes(item.id),
          'sidebar-group-active': this.state.currentActiveGroup.includes(item.id),
          hover: this.props.hoverIndex === item.id,
          active: this.props.activeItemState === item.navLink && item.type === 'item' || item.parentOf && item.parentOf.includes(this.props.activeItemState),
          disabled: item.disabled
        }),
        key: item.id,
        onClick: e => {
          e.stopPropagation();

          if (item.type === 'item') {
            this.props.handleActiveItem(item.navLink);
            this.handleGroupClick(item.id, null, item.type);

            if (this.props.deviceWidth <= 1200 && item.type === 'item') {
              this.props.toggleMenu();
            }
          } else {
            this.handleGroupClick(item.id, null, item.type);
          }
        }
      }, /*#__PURE__*/React.createElement(CustomAnchorTag, {
        to: item.filterBase ? item.filterBase : item.navLink && item.type === 'item' ? item.navLink : '',
        href: this.getItemLink(item),
        className: `d-flex ${item.badgeText ? 'justify-content-between' : 'justify-content-start'}`,
        onMouseEnter: () => {
          this.props.handleSidebarMouseEnter(item.id);
        },
        onMouseLeave: () => {
          this.props.handleSidebarMouseEnter(item.id);
        },
        key: item.id,
        onClick: e => {
          return item.type === 'collapse' ? e.preventDefault() : '';
        },
        target: item.newTab ? '_blank' : undefined
      }, /*#__PURE__*/React.createElement("div", {
        className: "menu-text"
      }, item.icon, /*#__PURE__*/React.createElement("span", {
        className: "menu-item menu-title"
      }, /*#__PURE__*/React.createElement(FormattedMessage, {
        id: item.title
      }))), item.badge ? /*#__PURE__*/React.createElement("div", {
        className: "menu-badge"
      }, /*#__PURE__*/React.createElement(Badge, {
        color: item.badge,
        className: "mr-1",
        pill: true
      }, item.badgeText)) : '', item.type === 'collapse' ? /*#__PURE__*/React.createElement(ChevronRight, {
        className: "menu-toggle-icon",
        size: 13
      }) : ''), item.type === 'collapse' ? /*#__PURE__*/React.createElement(SideMenuGroup, {
        group: item,
        handleGroupClick: this.handleGroupClick,
        activeGroup: this.state.activeGroups,
        handleActiveItem: this.props.handleActiveItem,
        activeItemState: this.props.activeItemState,
        handleSidebarMouseEnter: this.props.handleSidebarMouseEnter,
        activePath: this.props.activePath,
        hoverIndex: this.props.hoverIndex,
        initRender: this.initRender,
        parentArr: this.parentArr,
        triggerActive: undefined,
        currentActiveGroup: this.state.currentActiveGroup,
        getItemLink: this.getItemLink,
        permission: this.props.permission,
        currentUser: this.props.currentUser,
        redirectUnauthorized: this.redirectUnauthorized,
        collapsedMenuPaths: this.props.collapsedMenuPaths,
        toggleMenu: this.props.toggleMenu,
        deviceWidth: this.props.deviceWidth
      }) : '');

      if (item.navLink && item.collapsed !== undefined && item.collapsed === true) {
        this.collapsedPath = item.navLink;
        this.props.collapsedMenuPaths(item.navLink);
      }

      if (item.type === 'collapse' || item.type === 'external-link' || item.type === 'item' && item.permissions && item.permissions.includes(this.props.currentUser.role) || item.permissions === undefined) {
        return renderItem;
      } else if (item.type === 'item' && item.navLink === this.props.activePath && !item.permissions.includes(this.props.currentUser.role)) {
        return this.redirectUnauthorized();
      }
    });
    return /*#__PURE__*/React.createElement(React.Fragment, null, menuItems);
  }

}

class Sidebar extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      width: window.innerWidth,
      activeIndex: null,
      hoveredMenuItem: null,
      activeItem: this.props.activePath,
      menuShadow: false,
      ScrollbarTag: PerfectScrollbar
    };
    this.mounted = false;

    this.updateWidth = () => {
      if (this.mounted) {
        this.setState(prevState => ({
          width: window.innerWidth
        }));
        this.checkDevice();
      }
    };

    this.checkDevice = () => {
      var prefixes = " -webkit- -moz- -o- -ms- ".split(" ");

      var mq = function (query) {
        return window.matchMedia(query).matches;
      };

      if ("ontouchstart" in window || window.DocumentTouch) {
        this.setState({
          ScrollbarTag: "div"
        });
      } else {
        this.setState({
          ScrollbarTag: PerfectScrollbar
        });
      }

      var query = ["(", prefixes.join("touch-enabled),("), "heartz", ")"].join("");
      return mq(query);
    };

    this.changeActiveIndex = id => {
      if (id !== this.state.activeIndex) {
        this.setState({
          activeIndex: id
        });
      } else {
        this.setState({
          activeIndex: null
        });
      }
    };

    this.handleSidebarMouseEnter = id => {
      if (id !== this.state.hoveredMenuItem) {
        this.setState({
          hoveredMenuItem: id
        });
      } else {
        this.setState({
          hoveredMenuItem: null
        });
      }
    };

    this.handleActiveItem = url => {
      this.setState({
        activeItem: url
      });
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.activePath !== state.activeItem) {
      return {
        activeItem: props.activePath
      };
    }

    return null;
  }

  componentDidMount() {
    this.mounted = true;

    if (this.mounted) {
      if (window !== "undefined") {
        window.addEventListener("resize", this.updateWidth, false);
      }

      this.checkDevice();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    let {
      toggleSidebarMenu,
      visibilityState,
      sidebarHover,
      toggle,
      color,
      sidebarVisibility,
      activeTheme,
      collapsed,
      activePath,
      sidebarState,
      currentLang,
      permission,
      currentUser,
      collapsedMenuPaths
    } = this.props;
    let {
      menuShadow,
      activeIndex,
      hoveredMenuItem,
      activeItem,
      ScrollbarTag
    } = this.state;

    let scrollShadow = (container, dir) => {
      if (container && dir === "up" && container.scrollTop >= 100) {
        this.setState({
          menuShadow: true
        });
      } else if (container && dir === "down" && container.scrollTop < 100) {
        this.setState({
          menuShadow: false
        });
      } else {
        return;
      }
    };

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hammer, {
      onSwipe: e => {
        sidebarVisibility();
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "menu-swipe-area d-xl-none d-block vh-100"
    })), /*#__PURE__*/React.createElement("div", {
      className: classnames(`main-menu menu-fixed menu-light menu-accordion menu-shadow theme-${activeTheme}`, {
        collapsed: sidebarState === true,
        "hide-sidebar": this.state.width < 1200 && visibilityState === false
      }),
      onMouseEnter: () => sidebarHover(false),
      onMouseLeave: () => sidebarHover(true)
    }, /*#__PURE__*/React.createElement(SidebarHeader, {
      toggleSidebarMenu: toggleSidebarMenu,
      toggle: toggle,
      sidebarBgColor: color,
      sidebarVisibility: sidebarVisibility,
      activeTheme: activeTheme,
      collapsed: collapsed,
      menuShadow: menuShadow,
      activePath: activePath,
      sidebarState: sidebarState
    }), /*#__PURE__*/React.createElement(ScrollbarTag, Object.assign({
      className: classnames("main-menu-content", {
        "overflow-hidden": ScrollbarTag !== "div",
        "overflow-scroll": ScrollbarTag === "div"
      })
    }, ScrollbarTag !== "div" && {
      options: {
        wheelPropagation: false
      },
      onScrollDown: container => scrollShadow(container, "down"),
      onScrollUp: container => scrollShadow(container, "up"),
      onYReachStart: () => menuShadow === true && this.setState({
        menuShadow: false
      })
    }), /*#__PURE__*/React.createElement(Hammer, {
      onSwipe: () => {
        sidebarVisibility();
      }
    }, /*#__PURE__*/React.createElement("ul", {
      className: "navigation navigation-main"
    }, /*#__PURE__*/React.createElement(SideMenuContent, {
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
  }

}

const mapStateToProps$1 = state => {
  return {
    currentUser: state.auth,
    navConfigs: state.navbar.navConfigs
  };
};

var Sidebar$1 = connect(mapStateToProps$1)(Sidebar);

class Layout extends PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      width: window.innerWidth,
      sidebarState: this.props.customizer.sidebarCollapsed,
      layout: this.props.customizer.theme,
      collapsedContent: this.props.customizer.sidebarCollapsed,
      sidebarHidden: false,
      currentLang: 'en',
      appOverlay: false,
      customizer: false,
      currRoute: ''
    };
    this.collapsedPaths = [];
    this.mounted = false;

    this.updateWidth = () => {
      if (this.mounted) {
        this.setState(prevState => ({
          width: window.innerWidth
        }));
      }
    };

    this.handleCustomizer = bool => {
      this.setState({
        customizer: bool
      });
    };

    this.handleCollapsedMenuPaths = item => {
      let collapsedPaths = this.collapsedPaths;

      if (!collapsedPaths.includes(item)) {
        collapsedPaths.push(item);
        this.collapsedPaths = collapsedPaths;
      }
    };

    this.toggleSidebarMenu = val => {
      this.setState({
        sidebarState: !this.state.sidebarState,
        collapsedContent: !this.state.collapsedContent
      });
    };

    this.sidebarMenuHover = val => {
      this.setState({
        sidebarState: val
      });
    };

    this.handleSidebarVisibility = () => {
      if (this.mounted) {
        if (window !== undefined) {
          window.addEventListener('resize', () => {
            if (this.state.sidebarHidden) {
              this.setState({
                sidebarHidden: !this.state.sidebarHidden
              });
            }
          });
        }

        this.setState({
          sidebarHidden: !this.state.sidebarHidden
        });
      }
    };

    this.handleCurrentLanguage = lang => {
      this.setState({
        currentLang: lang
      });
    };

    this.handleAppOverlay = value => {
      if (value.length > 0) {
        this.setState({
          appOverlay: true
        });
      } else if (value.length < 0 || value === '') {
        this.setState({
          appOverlay: false
        });
      }
    };

    this.handleAppOverlayClick = () => {
      this.setState({
        appOverlay: false
      });
    };
  }

  componentDidMount() {
    this.mounted = true;
    let {
      location: {
        pathname
      },
      customizer: {
        theme,
        direction
      }
    } = this.props;

    if (this.mounted) {
      if (window !== 'undefined') {
        window.addEventListener('resize', this.updateWidth, false);
      }

      if (this.collapsedPaths.includes(pathname)) {
        this.props.collapseSidebar(true);
      }

      let layout = theme;
      let dir = direction;
      if (dir === 'rtl') document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');else document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
      return layout === 'dark' ? document.body.classList.add('dark-layout') : layout === 'semi-dark' ? document.body.classList.add('semi-dark-layout') : null;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let {
      location: {
        pathname
      },
      customizer: {
        theme,
        sidebarCollapsed
      }
    } = this.props;
    let layout = theme;

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
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const appProps = this.props.customizer;
    const menuThemeArr = ['primary', 'success', 'danger', 'info', 'warning', 'dark'];
    const sidebarProps = {
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
    const navbarProps = {
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
    const footerProps = {
      appId: this.props.appId,
      footerType: appProps.footerType,
      hideScrollToTop: appProps.hideScrollToTop
    };
    return /*#__PURE__*/React.createElement("div", {
      className: classnames(`wrapper vertical-layout theme-${appProps.menuTheme}`, {
        'menu-collapsed': this.state.collapsedContent === true && this.state.width >= 1200,
        'fixed-footer': appProps.footerType === 'sticky',
        'navbar-static': appProps.navbarType === 'static',
        'navbar-sticky': appProps.navbarType === 'sticky',
        'navbar-floating': appProps.navbarType === 'floating',
        'navbar-hidden': appProps.navbarType === 'hidden',
        'theme-primary': !menuThemeArr.includes(appProps.menuTheme)
      })
    }, /*#__PURE__*/React.createElement(Sidebar$1, sidebarProps), /*#__PURE__*/React.createElement("div", {
      className: classnames('app-content content', {
        'show-overlay': this.state.appOverlay === true
      }),
      onClick: this.handleAppOverlayClick
    }, /*#__PURE__*/React.createElement(PerfectScrollbar, null, /*#__PURE__*/React.createElement(Navbar, navbarProps), /*#__PURE__*/React.createElement("div", {
      className: "content-wrapper"
    }, this.props.children))), /*#__PURE__*/React.createElement(Footer, footerProps), /*#__PURE__*/React.createElement("div", {
      className: "sidenav-overlay",
      onClick: this.handleSidebarVisibility
    }));
  }

}

const mapStateToProps$2 = state => {
  return {
    customizer: state.customizer
  };
};

var Layout$1 = connect(mapStateToProps$2, {
  changeMode,
  collapseSidebar,
  changeNavbarColor,
  changeNavbarType,
  changeFooterType,
  changeMenuColor,
  hideScrollToTop
})(Layout);

const LOAD_NATIVGATION$1 = 'LOAD_NATIVGATION';
const loadNavtigation = appId => {
  return async dispatch => {
    try {
      const res = await NavBarService.getNativagtion();
      const roles = res.data || [];
      const navConfigs = getNativgationConfig(appId, roles);
      dispatch({
        type: LOAD_NATIVGATION$1,
        payload: {
          navConfigs,
          roles
        }
      });
    } catch (error) {
      dispatch({
        type: LOAD_NATIVGATION$1,
        payload: {
          navConfigs: getNativgationConfig(appId),
          roles: []
        }
      });
    }
  };
};

const Context = React.createContext();

class IntlProviderWrapper extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      locale: localStorage.getItem('language'),
      messages: this.props.appMessage[localStorage.getItem('language')]
    };
  }

  render() {
    const {
      children
    } = this.props;
    const {
      locale,
      messages
    } = this.state;
    return /*#__PURE__*/React.createElement(Context.Provider, {
      value: {
        state: this.state,
        switchLanguage: language => {
          localStorage.setItem('language', language);
          this.setState({
            locale: language,
            messages: this.props.appMessage[language]
          });
        }
      }
    }, /*#__PURE__*/React.createElement(IntlProvider, {
      key: locale,
      locale: locale,
      messages: messages,
      defaultLocale: "vi"
    }, children));
  }

}

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
	"changePassword.passwordMustMatch": "Password must match",
	"createPassword.title": "CREATE PASSWORD *",
	"createPassword.password.required": "You must enter your password",
	"createPassword.enterThePassword": "Enter the password *",
	"createPassword.passwordMustMatch": "Password must match",
	"createPassword.condition.1": "- At least 8 characters long",
	"createPassword.condition.2": "- Include upper and lower case characters",
	"createPassword.condition.3": "- Include numeric or special characters",
	"createPassword.continutes": "CONTINUTE",
	"createPassword.done": "DONE",
	"provideNewPassword.title": "PROVIDE A NEW PASSWORD",
	"provideNewPassword.continutes": "DONE",
	"provideNewPassword.password": "Enter your new password *",
	"provideNewPassword.enterThePassword": "Enter a new password *",
	"completeInformation.idType": "Type of identification*",
	"completeInformation.nbrPer": "Identification document number*",
	"completeInformation.nbrPer.required": "You must enter infor number",
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
	"completeInformation.province": "Province*",
	"completeInformation.district": "District*",
	"completeInformation.wards": "Wards*",
	"completeInformation.bank": "Bank*",
	"completeInformation.back": "BACK",
	"completeInformation.done": "DONE"
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
	"changePassword.passwordMustMatch": "Mật khẩu không trùng khớp",
	"createPassword.title": "TẠO MẬT KHẨU *",
	"createPassword.password.required": "Bạn phải nhập mật khẩu",
	"createPassword.enterThePassword": "Nhập lại mật khẩu *",
	"createPassword.passwordMustMatch": "Mật khẩu phải trùng khớp",
	"createPassword.condition.1": "- Dài ít nhất 8 ký tự",
	"createPassword.condition.2": "- Bao gồm ký tự viết hoa và viết thường",
	"createPassword.condition.3": "- Bao gồm ký tự số hoặc ký tự đặc biệt",
	"createPassword.continutes": "TIẾP TỤC",
	"createPassword.done": "HOÀN THÀNH",
	"provideNewPassword.title": "CẤP MẬT KHẨU MỚI",
	"provideNewPassword.continutes": "THỰC HIỆN",
	"provideNewPassword.password": "Nhập mật khẩu mới *",
	"provideNewPassword.enterThePassword": "Nhập lại mật khẩu mới *",
	"createPassword.enterThePassword.required": "Bạn phải nhập mật khẩu mới",
	"completeInformation.idType": "Loại giấy tờ tùy thân *",
	"completeInformation.nbrPer": "Số giấy tờ tuỳ thân *",
	"completeInformation.nbrPer.required": "Bạn phải nhập số giấy tờ tuỳ thân",
	"completeInformation.dateOfBirth": "Ngày sinh",
	"completeInformation.dateOfBirth.required": "Bạn phải nhập ngày sinh",
	"completeInformation.address": "Địa chỉ*",
	"completeInformation.address.required": "Bạn phải nhập địa chỉ*",
	"completeInformation.gif": "Mã giới thiệu",
	"completeInformation.branch": "Chi nhánh*",
	"completeInformation.branch.required": "Bạn phải nhập chi nhánh",
	"completeInformation.accountNbr": "Số tài khoản*",
	"completeInformation.personalInfo": "Hộ chiếu*",
	"completeInformation.gender": "Giới tính",
	"completeInformation.province": "Tỉnh/Thành Phố*",
	"completeInformation.district": "Quận/Huyện*",
	"completeInformation.wards": "Phường/Xã*",
	"completeInformation.bank": "Ngân hàng*",
	"completeInformation.back": "Quay lại",
	"completeInformation.done": "Hoàn thành"
};

class CheckBox extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: `vx-checkbox-con ${this.props.className ? this.props.className : ''} vx-checkbox-${this.props.color}`
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      defaultChecked: this.props.defaultChecked,
      checked: this.props.checked,
      value: this.props.value,
      disabled: this.props.disabled,
      onClick: this.props.onClick ? this.props.onClick : null,
      onChange: this.props.onChange ? this.props.onChange : null
    }), /*#__PURE__*/React.createElement("span", {
      className: `vx-checkbox vx-checkbox-${this.props.size ? this.props.size : 'md'}`
    }, /*#__PURE__*/React.createElement("span", {
      className: "vx-checkbox--check"
    }, this.props.icon)), /*#__PURE__*/React.createElement("span", null, this.props.label));
  }

}

class UserAccountTab extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
      sm: "12"
    }, /*#__PURE__*/React.createElement(Media, {
      className: "mb-2"
    }, /*#__PURE__*/React.createElement(Media, {
      className: "mr-2 my-25",
      left: true,
      href: "#"
    }, /*#__PURE__*/React.createElement(Media, {
      className: "users-avatar-shadow rounded",
      object: true,
      src: 'https://storage.live.com/Users/-6155523327610065665/MyProfile/ExpressionProfile/ProfilePhoto:Win8Static,UserTileMedium,UserTileStatic',
      alt: "user profile image",
      height: "84",
      width: "84"
    })), /*#__PURE__*/React.createElement(Media, {
      className: "mt-2",
      body: true
    }, /*#__PURE__*/React.createElement(Media, {
      className: "font-medium-1 text-bold-600",
      tag: "p",
      heading: true
    }, "Crystal Hamilton"), /*#__PURE__*/React.createElement("div", {
      className: "d-flex flex-wrap"
    }, /*#__PURE__*/React.createElement(Button.Ripple, {
      className: "mr-1",
      color: "primary",
      outline: true
    }, "Change"), /*#__PURE__*/React.createElement(Button.Ripple, {
      color: "flat-danger"
    }, "Remove Avatar"))))), /*#__PURE__*/React.createElement(Col, {
      sm: "12"
    }, /*#__PURE__*/React.createElement(Form, {
      onSubmit: e => e.preventDefault()
    }, /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
      md: "6",
      sm: "12"
    }, /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "username"
    }, "Username"), /*#__PURE__*/React.createElement(Input, {
      type: "text",
      defaultValue: "crystal",
      id: "username",
      placeholder: "Username"
    }))), /*#__PURE__*/React.createElement(Col, {
      md: "6",
      sm: "12"
    }, /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "status"
    }, "Status"), /*#__PURE__*/React.createElement(Input, {
      type: "select",
      name: "status",
      id: "status"
    }, /*#__PURE__*/React.createElement("option", null, "Active"), /*#__PURE__*/React.createElement("option", null, "Banned"), /*#__PURE__*/React.createElement("option", null, "Closed")))), /*#__PURE__*/React.createElement(Col, {
      md: "6",
      sm: "12"
    }, /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "name"
    }, "Name"), /*#__PURE__*/React.createElement(Input, {
      type: "text",
      defaultValue: "Crystal Hamilton",
      id: "name",
      placeholder: "Name"
    }))), /*#__PURE__*/React.createElement(Col, {
      md: "6",
      sm: "12"
    }, /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "role"
    }, "Role"), /*#__PURE__*/React.createElement(Input, {
      type: "select",
      name: "role",
      id: "role"
    }, /*#__PURE__*/React.createElement("option", null, "User"), /*#__PURE__*/React.createElement("option", null, "Staff")))), /*#__PURE__*/React.createElement(Col, {
      md: "6",
      sm: "12"
    }, /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "email"
    }, "Email"), /*#__PURE__*/React.createElement(Input, {
      type: "text",
      defaultValue: "crystalhamilton@gmail.com",
      id: "email",
      placeholder: "Email"
    }))), /*#__PURE__*/React.createElement(Col, {
      md: "6",
      sm: "12"
    }, /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "company"
    }, "Company"), /*#__PURE__*/React.createElement(Input, {
      type: "text",
      id: "company",
      defaultValue: "North Star Aviation Pvt Ltd",
      placeholder: "company"
    }))), /*#__PURE__*/React.createElement(Col, {
      sm: "12"
    }, /*#__PURE__*/React.createElement("div", {
      className: "permissions border px-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "title pt-2 pb-0"
    }, /*#__PURE__*/React.createElement(Lock, {
      size: 19
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-bold-500 font-medium-2 ml-50"
    }, "Permissions"), /*#__PURE__*/React.createElement("hr", null)), /*#__PURE__*/React.createElement(Table, {
      borderless: true,
      responsive: true
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Module Permission"), /*#__PURE__*/React.createElement("th", null, "Read"), /*#__PURE__*/React.createElement("th", null, "Write"), /*#__PURE__*/React.createElement("th", null, "Create"), /*#__PURE__*/React.createElement("th", null, "Delete"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Users"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React.createElement(Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: true
    })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React.createElement(Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: false
    })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React.createElement(Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: false
    })), /*#__PURE__*/React.createElement("td", null, ' ', /*#__PURE__*/React.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React.createElement(Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: true
    }))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Articles"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React.createElement(Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: false
    })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React.createElement(Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: true
    })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React.createElement(Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: false
    })), /*#__PURE__*/React.createElement("td", null, ' ', /*#__PURE__*/React.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React.createElement(Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: true
    }))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Staff"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React.createElement(Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: true
    })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React.createElement(Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: true
    })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React.createElement(Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: false
    })), /*#__PURE__*/React.createElement("td", null, ' ', /*#__PURE__*/React.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React.createElement(Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: false
    }))))))), /*#__PURE__*/React.createElement(Col, {
      className: "d-flex justify-content-end flex-wrap mt-2",
      sm: "12"
    }, /*#__PURE__*/React.createElement(Button.Ripple, {
      className: "mr-1",
      color: "primary"
    }, "Save Changes"), /*#__PURE__*/React.createElement(Button.Ripple, {
      color: "flat-warning"
    }, "Reset"))))));
  }

}

class Radio extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: classnames(`vx-radio-con ${this.props.className} vx-radio-${this.props.color}`)
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      defaultChecked: this.props.defaultChecked,
      value: this.props.value,
      disabled: this.props.disabled,
      name: this.props.name,
      onClick: this.props.onClick,
      onChange: this.props.onChange,
      ref: this.props.ref,
      checked: this.props.checked
    }), /*#__PURE__*/React.createElement("span", {
      className: classnames("vx-radio", {
        "vx-radio-sm": this.props.size === "sm",
        "vx-radio-lg": this.props.size === "lg"
      })
    }, /*#__PURE__*/React.createElement("span", {
      className: "vx-radio--border"
    }), /*#__PURE__*/React.createElement("span", {
      className: "vx-radio--circle"
    })), /*#__PURE__*/React.createElement("span", null, this.props.label));
  }

}

const languages = [{
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
const colourStyles = {
  control: styles => ({ ...styles,
    backgroundColor: 'white'
  }),
  option: (styles, {
    data,
    isDisabled,
    isFocused,
    isSelected
  }) => {
    const color = data.color ? chroma(data.color) : '#7367f0';
    return { ...styles,
      backgroundColor: isDisabled ? null : isSelected ? data.color : isFocused ? color.alpha(0.1).css() : null,
      color: isDisabled ? '#ccc' : isSelected ? chroma.contrast(color, 'white') > 2 ? 'white' : 'black' : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',
      ':active': { ...styles[':active'],
        backgroundColor: !isDisabled && (isSelected ? data.color : '#7367f0')
      }
    };
  },
  multiValue: (styles, {
    data
  }) => {
    const color = data.color ? chroma(data.color) : '#7367f0';
    return { ...styles,
      backgroundColor: color.alpha(0.1).css()
    };
  },
  multiValueLabel: (styles, {
    data
  }) => ({ ...styles,
    color: data.color ? data.color : '#7367f0'
  }),
  multiValueRemove: (styles, {
    data
  }) => ({ ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color ? data.color : '#7367f0',
      color: 'white'
    }
  })
};

class UserInfoTab extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      dob: new Date('1995-05-22')
    };

    this.handledob = date => {
      this.setState({
        dob: date
      });
    };
  }

  render() {
    return /*#__PURE__*/React.createElement(Form, {
      onSubmit: e => e.preventDefault()
    }, /*#__PURE__*/React.createElement(Row, {
      className: "mt-1"
    }, /*#__PURE__*/React.createElement(Col, {
      className: "mt-1",
      md: "6",
      sm: "12"
    }, /*#__PURE__*/React.createElement("h5", {
      className: "mb-1"
    }, /*#__PURE__*/React.createElement(User, {
      className: "mr-50",
      size: 16
    }), /*#__PURE__*/React.createElement("span", {
      className: "align-middle"
    }, "Personal Info")), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      className: "d-block",
      for: "dob"
    }, "Date of birth"), /*#__PURE__*/React.createElement(Flatpickr, {
      id: "dob",
      className: "form-control",
      options: {
        dateFormat: 'Y-m-d'
      },
      value: this.state.dob,
      onChange: date => this.handledob(date)
    })), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "contactnumber"
    }, "Contact Number"), /*#__PURE__*/React.createElement(Input, {
      type: "number",
      id: "contactnumber",
      placeholder: "Contact Number"
    })), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "website"
    }, "Website"), /*#__PURE__*/React.createElement(Input, {
      type: "url",
      id: "website",
      placeholder: "Web Address"
    })), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "languages"
    }, "Languages"), /*#__PURE__*/React.createElement(Select$1, {
      isMulti: true,
      defaultValue: [languages[0], languages[1], languages[2]],
      isClearable: true,
      styles: colourStyles,
      options: languages,
      className: "React",
      classNamePrefix: "select",
      id: "languages"
    })), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      className: "d-block mb-50"
    }, "Gender"), /*#__PURE__*/React.createElement("div", {
      className: "d-inline-block mr-1"
    }, /*#__PURE__*/React.createElement(Radio, {
      label: "Male",
      color: "primary",
      defaultChecked: false,
      name: "gender"
    })), /*#__PURE__*/React.createElement("div", {
      className: "d-inline-block mr-1"
    }, /*#__PURE__*/React.createElement(Radio, {
      label: "Female",
      color: "primary",
      defaultChecked: true,
      name: "gender"
    })), /*#__PURE__*/React.createElement("div", {
      className: "d-inline-block"
    }, /*#__PURE__*/React.createElement(Radio, {
      label: "Others",
      color: "primary",
      defaultChecked: false,
      name: "gender"
    }))), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      className: "d-block mb-50",
      for: "communication"
    }, "Communication"), /*#__PURE__*/React.createElement("div", {
      className: "d-inline-block mr-1"
    }, /*#__PURE__*/React.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React.createElement(Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "Email",
      defaultChecked: false
    })), /*#__PURE__*/React.createElement("div", {
      className: "d-inline-block mr-1"
    }, /*#__PURE__*/React.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React.createElement(Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "SMS",
      defaultChecked: false
    })), /*#__PURE__*/React.createElement("div", {
      className: "d-inline-block"
    }, /*#__PURE__*/React.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React.createElement(Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "Phone",
      defaultChecked: false
    })))), /*#__PURE__*/React.createElement(Col, {
      className: "mt-1",
      md: "6",
      sm: "12"
    }, /*#__PURE__*/React.createElement("h5", {
      className: "mb-1"
    }, /*#__PURE__*/React.createElement(MapPin, {
      className: "mr-50",
      size: 16
    }), /*#__PURE__*/React.createElement("span", {
      className: "align-middle"
    }, "Address")), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "address1"
    }, "Address Line 1"), /*#__PURE__*/React.createElement(Input, {
      type: "text",
      id: "address1",
      placeholder: "Last Name Here"
    })), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "address1"
    }, "Address Line 2"), /*#__PURE__*/React.createElement(Input, {
      type: "text",
      id: "address1",
      placeholder: "Address Line 2"
    })), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "pincode"
    }, "Pincode"), /*#__PURE__*/React.createElement(Input, {
      type: "text",
      id: "pincode",
      placeholder: "Pincode"
    })), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "city"
    }, "City"), /*#__PURE__*/React.createElement(Input, {
      type: "text",
      defaultValue: "Camden Town",
      id: "city",
      placeholder: "City"
    })), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "State"
    }, "State"), /*#__PURE__*/React.createElement(Input, {
      type: "text",
      defaultValue: "London",
      id: "State",
      placeholder: "State"
    })), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "Country"
    }, "Country"), /*#__PURE__*/React.createElement(Input, {
      type: "text",
      defaultValue: "UK",
      id: "Country",
      placeholder: "Country"
    }))), /*#__PURE__*/React.createElement(Col, {
      className: "d-flex justify-content-end flex-wrap",
      sm: "12"
    }, /*#__PURE__*/React.createElement(Button.Ripple, {
      className: "mr-1",
      color: "primary"
    }, "Save Changes"), /*#__PURE__*/React.createElement(Button.Ripple, {
      color: "flat-warning"
    }, "Reset"))));
  }

}

const AccountSettings = props => {
  const [activeTab, setActiveTab] = useState('account-info');
  useEffect(() => setActiveTab(props.activeTab), [props.activeTab]);
  return /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    sm: "12"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: 'setting.personalSetting'
  }))), /*#__PURE__*/React.createElement(CardBody, {
    className: "pt-2"
  }, /*#__PURE__*/React.createElement(Nav, {
    tabs: true
  }, /*#__PURE__*/React.createElement(NavItem, null, /*#__PURE__*/React.createElement(NavLink, {
    className: classnames({
      active: activeTab === 'account-info'
    }),
    onClick: () => {
      setActiveTab('account-info');
    }
  }, /*#__PURE__*/React.createElement(User, {
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    className: "align-middle ml-50"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "setting.accountInformation"
  })))), /*#__PURE__*/React.createElement(NavItem, null, /*#__PURE__*/React.createElement(NavLink, {
    className: classnames({
      active: activeTab === 'change-password'
    }),
    onClick: () => {
      setActiveTab('change-password');
    }
  }, /*#__PURE__*/React.createElement(Info, {
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    className: "align-middle ml-50"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "setting.changePassword"
  }))))), /*#__PURE__*/React.createElement(TabContent, {
    activeTab: activeTab
  }, /*#__PURE__*/React.createElement(TabPane, {
    tabId: "account-info"
  }, /*#__PURE__*/React.createElement(UserAccountTab, null)), /*#__PURE__*/React.createElement(TabPane, {
    tabId: "change-password"
  }, /*#__PURE__*/React.createElement(UserInfoTab, null)))))));
};

class UserAccountTab$1 extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
      sm: "12"
    }, /*#__PURE__*/React.createElement(Media, {
      className: "mb-2"
    }, /*#__PURE__*/React.createElement(Media, {
      className: "mr-2 my-25",
      left: true,
      href: "#"
    }, /*#__PURE__*/React.createElement(Media, {
      className: "users-avatar-shadow rounded",
      object: true,
      src: 'https://storage.live.com/Users/-6155523327610065665/MyProfile/ExpressionProfile/ProfilePhoto:Win8Static,UserTileMedium,UserTileStatic',
      alt: "user profile image",
      height: "84",
      width: "84"
    })), /*#__PURE__*/React.createElement(Media, {
      className: "mt-2",
      body: true
    }, /*#__PURE__*/React.createElement(Media, {
      className: "font-medium-1 text-bold-600",
      tag: "p",
      heading: true
    }, "Crystal Hamilton"), /*#__PURE__*/React.createElement("div", {
      className: "d-flex flex-wrap"
    }, /*#__PURE__*/React.createElement(Button.Ripple, {
      className: "mr-1",
      color: "primary",
      outline: true
    }, "Change"), /*#__PURE__*/React.createElement(Button.Ripple, {
      color: "flat-danger"
    }, "Remove Avatar"))))), /*#__PURE__*/React.createElement(Col, {
      sm: "12"
    }, /*#__PURE__*/React.createElement(Form, {
      onSubmit: e => e.preventDefault()
    }, /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
      md: "6",
      sm: "12"
    }, /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "username"
    }, "Username"), /*#__PURE__*/React.createElement(Input, {
      type: "text",
      defaultValue: "crystal",
      id: "username",
      placeholder: "Username"
    }))), /*#__PURE__*/React.createElement(Col, {
      md: "6",
      sm: "12"
    }, /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "status"
    }, "Status"), /*#__PURE__*/React.createElement(Input, {
      type: "select",
      name: "status",
      id: "status"
    }, /*#__PURE__*/React.createElement("option", null, "Active"), /*#__PURE__*/React.createElement("option", null, "Banned"), /*#__PURE__*/React.createElement("option", null, "Closed")))), /*#__PURE__*/React.createElement(Col, {
      md: "6",
      sm: "12"
    }, /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "name"
    }, "Name"), /*#__PURE__*/React.createElement(Input, {
      type: "text",
      defaultValue: "Crystal Hamilton",
      id: "name",
      placeholder: "Name"
    }))), /*#__PURE__*/React.createElement(Col, {
      md: "6",
      sm: "12"
    }, /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "role"
    }, "Role"), /*#__PURE__*/React.createElement(Input, {
      type: "select",
      name: "role",
      id: "role"
    }, /*#__PURE__*/React.createElement("option", null, "User"), /*#__PURE__*/React.createElement("option", null, "Staff")))), /*#__PURE__*/React.createElement(Col, {
      md: "6",
      sm: "12"
    }, /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "email"
    }, "Email"), /*#__PURE__*/React.createElement(Input, {
      type: "text",
      defaultValue: "crystalhamilton@gmail.com",
      id: "email",
      placeholder: "Email"
    }))), /*#__PURE__*/React.createElement(Col, {
      md: "6",
      sm: "12"
    }, /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "company"
    }, "Company"), /*#__PURE__*/React.createElement(Input, {
      type: "text",
      id: "company",
      defaultValue: "North Star Aviation Pvt Ltd",
      placeholder: "company"
    }))), /*#__PURE__*/React.createElement(Col, {
      sm: "12"
    }, /*#__PURE__*/React.createElement("div", {
      className: "permissions border px-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "title pt-2 pb-0"
    }, /*#__PURE__*/React.createElement(Lock, {
      size: 19
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-bold-500 font-medium-2 ml-50"
    }, "Permissions"), /*#__PURE__*/React.createElement("hr", null)), /*#__PURE__*/React.createElement(Table, {
      borderless: true,
      responsive: true
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Module Permission"), /*#__PURE__*/React.createElement("th", null, "Read"), /*#__PURE__*/React.createElement("th", null, "Write"), /*#__PURE__*/React.createElement("th", null, "Create"), /*#__PURE__*/React.createElement("th", null, "Delete"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Users"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React.createElement(Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: true
    })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React.createElement(Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: false
    })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React.createElement(Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: false
    })), /*#__PURE__*/React.createElement("td", null, ' ', /*#__PURE__*/React.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React.createElement(Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: true
    }))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Articles"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React.createElement(Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: false
    })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React.createElement(Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: true
    })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React.createElement(Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: false
    })), /*#__PURE__*/React.createElement("td", null, ' ', /*#__PURE__*/React.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React.createElement(Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: true
    }))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Staff"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React.createElement(Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: true
    })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React.createElement(Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: true
    })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React.createElement(Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: false
    })), /*#__PURE__*/React.createElement("td", null, ' ', /*#__PURE__*/React.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React.createElement(Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "",
      defaultChecked: false
    }))))))), /*#__PURE__*/React.createElement(Col, {
      className: "d-flex justify-content-end flex-wrap mt-2",
      sm: "12"
    }, /*#__PURE__*/React.createElement(Button.Ripple, {
      className: "mr-1",
      color: "primary"
    }, "Save Changes"), /*#__PURE__*/React.createElement(Button.Ripple, {
      color: "flat-warning"
    }, "Reset"))))));
  }

}

const languages$1 = [{
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
const colourStyles$1 = {
  control: styles => ({ ...styles,
    backgroundColor: 'white'
  }),
  option: (styles, {
    data,
    isDisabled,
    isFocused,
    isSelected
  }) => {
    const color = data.color ? chroma(data.color) : '#7367f0';
    return { ...styles,
      backgroundColor: isDisabled ? null : isSelected ? data.color : isFocused ? color.alpha(0.1).css() : null,
      color: isDisabled ? '#ccc' : isSelected ? chroma.contrast(color, 'white') > 2 ? 'white' : 'black' : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',
      ':active': { ...styles[':active'],
        backgroundColor: !isDisabled && (isSelected ? data.color : '#7367f0')
      }
    };
  },
  multiValue: (styles, {
    data
  }) => {
    const color = data.color ? chroma(data.color) : '#7367f0';
    return { ...styles,
      backgroundColor: color.alpha(0.1).css()
    };
  },
  multiValueLabel: (styles, {
    data
  }) => ({ ...styles,
    color: data.color ? data.color : '#7367f0'
  }),
  multiValueRemove: (styles, {
    data
  }) => ({ ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color ? data.color : '#7367f0',
      color: 'white'
    }
  })
};

class UserInfoTab$1 extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      dob: new Date('1995-05-22')
    };

    this.handledob = date => {
      this.setState({
        dob: date
      });
    };
  }

  render() {
    return /*#__PURE__*/React.createElement(Form, {
      onSubmit: e => e.preventDefault()
    }, /*#__PURE__*/React.createElement(Row, {
      className: "mt-1"
    }, /*#__PURE__*/React.createElement(Col, {
      className: "mt-1",
      md: "6",
      sm: "12"
    }, /*#__PURE__*/React.createElement("h5", {
      className: "mb-1"
    }, /*#__PURE__*/React.createElement(User, {
      className: "mr-50",
      size: 16
    }), /*#__PURE__*/React.createElement("span", {
      className: "align-middle"
    }, "Personal Info")), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      className: "d-block",
      for: "dob"
    }, "Date of birth"), /*#__PURE__*/React.createElement(Flatpickr, {
      id: "dob",
      className: "form-control",
      options: {
        dateFormat: 'Y-m-d'
      },
      value: this.state.dob,
      onChange: date => this.handledob(date)
    })), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "contactnumber"
    }, "Contact Number"), /*#__PURE__*/React.createElement(Input, {
      type: "number",
      id: "contactnumber",
      placeholder: "Contact Number"
    })), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "website"
    }, "Website"), /*#__PURE__*/React.createElement(Input, {
      type: "url",
      id: "website",
      placeholder: "Web Address"
    })), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "languages"
    }, "Languages"), /*#__PURE__*/React.createElement(Select$1, {
      isMulti: true,
      defaultValue: [languages$1[0], languages$1[1], languages$1[2]],
      isClearable: true,
      styles: colourStyles$1,
      options: languages$1,
      className: "React",
      classNamePrefix: "select",
      id: "languages"
    })), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      className: "d-block mb-50"
    }, "Gender"), /*#__PURE__*/React.createElement("div", {
      className: "d-inline-block mr-1"
    }, /*#__PURE__*/React.createElement(Radio, {
      label: "Male",
      color: "primary",
      defaultChecked: false,
      name: "gender"
    })), /*#__PURE__*/React.createElement("div", {
      className: "d-inline-block mr-1"
    }, /*#__PURE__*/React.createElement(Radio, {
      label: "Female",
      color: "primary",
      defaultChecked: true,
      name: "gender"
    })), /*#__PURE__*/React.createElement("div", {
      className: "d-inline-block"
    }, /*#__PURE__*/React.createElement(Radio, {
      label: "Others",
      color: "primary",
      defaultChecked: false,
      name: "gender"
    }))), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      className: "d-block mb-50",
      for: "communication"
    }, "Communication"), /*#__PURE__*/React.createElement("div", {
      className: "d-inline-block mr-1"
    }, /*#__PURE__*/React.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React.createElement(Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "Email",
      defaultChecked: false
    })), /*#__PURE__*/React.createElement("div", {
      className: "d-inline-block mr-1"
    }, /*#__PURE__*/React.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React.createElement(Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "SMS",
      defaultChecked: false
    })), /*#__PURE__*/React.createElement("div", {
      className: "d-inline-block"
    }, /*#__PURE__*/React.createElement(CheckBox, {
      color: "primary",
      icon: /*#__PURE__*/React.createElement(Check, {
        className: "vx-icon",
        size: 16
      }),
      label: "Phone",
      defaultChecked: false
    })))), /*#__PURE__*/React.createElement(Col, {
      className: "mt-1",
      md: "6",
      sm: "12"
    }, /*#__PURE__*/React.createElement("h5", {
      className: "mb-1"
    }, /*#__PURE__*/React.createElement(MapPin, {
      className: "mr-50",
      size: 16
    }), /*#__PURE__*/React.createElement("span", {
      className: "align-middle"
    }, "Address")), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "address1"
    }, "Address Line 1"), /*#__PURE__*/React.createElement(Input, {
      type: "text",
      id: "address1",
      placeholder: "Last Name Here"
    })), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "address1"
    }, "Address Line 2"), /*#__PURE__*/React.createElement(Input, {
      type: "text",
      id: "address1",
      placeholder: "Address Line 2"
    })), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "pincode"
    }, "Pincode"), /*#__PURE__*/React.createElement(Input, {
      type: "text",
      id: "pincode",
      placeholder: "Pincode"
    })), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "city"
    }, "City"), /*#__PURE__*/React.createElement(Input, {
      type: "text",
      defaultValue: "Camden Town",
      id: "city",
      placeholder: "City"
    })), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "State"
    }, "State"), /*#__PURE__*/React.createElement(Input, {
      type: "text",
      defaultValue: "London",
      id: "State",
      placeholder: "State"
    })), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "Country"
    }, "Country"), /*#__PURE__*/React.createElement(Input, {
      type: "text",
      defaultValue: "UK",
      id: "Country",
      placeholder: "Country"
    }))), /*#__PURE__*/React.createElement(Col, {
      className: "d-flex justify-content-end flex-wrap",
      sm: "12"
    }, /*#__PURE__*/React.createElement(Button.Ripple, {
      className: "mr-1",
      color: "primary"
    }, "Save Changes"), /*#__PURE__*/React.createElement(Button.Ripple, {
      color: "flat-warning"
    }, "Reset"))));
  }

}

const GeneralInfo = props => {
  const [activeTab, setActiveTab] = useState('terms-and-condition');
  useEffect(() => setActiveTab(props.activeTab), [props.activeTab]);
  return /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    sm: "12"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, null, /*#__PURE__*/React.createElement(CardTitle, null, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: 'setting.generalInformation'
  }))), /*#__PURE__*/React.createElement(CardBody, {
    className: "pt-2"
  }, /*#__PURE__*/React.createElement(Nav, {
    tabs: true
  }, /*#__PURE__*/React.createElement(NavItem, null, /*#__PURE__*/React.createElement(NavLink, {
    className: classnames({
      active: activeTab === 'terms-and-condition'
    }),
    onClick: () => {
      setActiveTab('terms-and-condition');
    }
  }, /*#__PURE__*/React.createElement(User, {
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    className: "align-middle ml-50"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "setting.accountInformation"
  })))), /*#__PURE__*/React.createElement(NavItem, null, /*#__PURE__*/React.createElement(NavLink, {
    className: classnames({
      active: activeTab === 'privacy-policy'
    }),
    onClick: () => {
      setActiveTab('privacy-policy');
    }
  }, /*#__PURE__*/React.createElement(Info, {
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    className: "align-middle ml-50"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "setting.changePassword"
  })))), /*#__PURE__*/React.createElement(NavItem, null, /*#__PURE__*/React.createElement(NavLink, {
    className: classnames({
      active: activeTab === 'language'
    }),
    onClick: () => {
      setActiveTab('language');
    }
  }, /*#__PURE__*/React.createElement(User, {
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    className: "align-middle ml-50"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "setting.accountInformation"
  })))), /*#__PURE__*/React.createElement(NavItem, null, /*#__PURE__*/React.createElement(NavLink, {
    className: classnames({
      active: activeTab === 'contact'
    }),
    onClick: () => {
      setActiveTab('contact');
    }
  }, /*#__PURE__*/React.createElement(Info, {
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    className: "align-middle ml-50"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "setting.changePassword"
  }))))), /*#__PURE__*/React.createElement(TabContent, {
    activeTab: activeTab
  }, /*#__PURE__*/React.createElement(TabPane, {
    tabId: "terms-and-condition"
  }, /*#__PURE__*/React.createElement(UserAccountTab$1, null)), /*#__PURE__*/React.createElement(TabPane, {
    tabId: "privacy-policy"
  }, /*#__PURE__*/React.createElement(UserInfoTab$1, null)), /*#__PURE__*/React.createElement(TabPane, {
    tabId: "language"
  }, /*#__PURE__*/React.createElement(UserAccountTab$1, null)), /*#__PURE__*/React.createElement(TabPane, {
    tabId: "contact"
  }, /*#__PURE__*/React.createElement(UserInfoTab$1, null)))))));
};

const BaseFormGroup = ({
  fieldName,
  errors,
  touched,
  messageId,
  type
}) => {
  return /*#__PURE__*/React.createElement(FormGroup, {
    className: "form-label-group position-relative"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: messageId
  }, msg => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Field, {
    type: type,
    name: fieldName,
    className: `form-control ${errors[fieldName] && touched[fieldName] && 'is-invalid'}`,
    placeholder: msg
  }), errors[fieldName] && touched[fieldName] ? /*#__PURE__*/React.createElement("div", {
    className: "text-danger"
  }, errors[fieldName]) : null, /*#__PURE__*/React.createElement(Label, null, msg))));
};

const formSchema = object().shape({
  username: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "login.username.required"
  })),
  password: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "login.password.required"
  }))
});

const Login = () => {
  const [rememberMe, setRememberMe] = useState(null);
  const [isRemeberMe, setIsRemeberMe] = useState(false);
  const dispatch = useDispatch();
  const loginStatus = useSelector$1(state => state.auth.loginStatus);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem(REMEMBER_ME_TOKEN));

    if (user) {
      setRememberMe(user);
    }
  }, []);

  const onSubmit = (values, actions) => {
    dispatch(loginAction({
      username: values.username,
      password: values.password,
      isRemeberMe
    }));
    actions.setSubmitting(false);
  };

  const onClickNotMe = () => {
    localStorage.removeItem(REMEMBER_ME_TOKEN);
    setRememberMe(null);
  };

  return /*#__PURE__*/React.createElement(Formik, {
    enableReinitialize: true,
    initialValues: {
      username: rememberMe ? rememberMe.username : '',
      password: ''
    },
    onSubmit: onSubmit,
    validationSchema: formSchema
  }, ({
    errors,
    touched
  }) => /*#__PURE__*/React.createElement(Form$1, null, /*#__PURE__*/React.createElement("h4", {
    className: "text-center text-white mb-3"
  }, rememberMe ? /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "login.sayHi",
    values: {
      name: rememberMe.name
    }
  }) : /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "login.firstWelcome"
  }), loginStatus === LOGIN_STATUS.FAIL ? /*#__PURE__*/React.createElement("div", {
    className: "text-danger mt-1"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "login.fail"
  })) : ''), rememberMe ? '' : /*#__PURE__*/React.createElement(BaseFormGroup, {
    messageId: "login.username",
    fieldName: "username",
    errors: errors,
    touched: touched
  }), /*#__PURE__*/React.createElement(FormGroup, {
    className: "form-label-group position-relative"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "login.password"
  }, msg => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FastField, {
    name: "password"
  }, ({
    field,
    form
  }) => /*#__PURE__*/React.createElement(Input, Object.assign({
    type: "password",
    className: `form-control ${errors.password && touched.password && 'is-invalid'}`,
    placeholder: msg
  }, field, {
    onChange: e => form.setFieldValue('password', e.target.value)
  }))), errors.password && touched.password ? /*#__PURE__*/React.createElement("div", {
    className: "text-danger"
  }, errors.password) : null, /*#__PURE__*/React.createElement(Label, null, msg)))), /*#__PURE__*/React.createElement(FormGroup, {
    className: "d-flex justify-content-between align-items-center"
  }, rememberMe ? /*#__PURE__*/React.createElement("a", {
    onClick: onClickNotMe
  }, "Kh\xF4ng ph\u1EA3i t\xF4i") : /*#__PURE__*/React.createElement(CheckBox, {
    color: "primary",
    icon: /*#__PURE__*/React.createElement(Check, {
      className: "vx-icon",
      size: 16
    }),
    label: /*#__PURE__*/React.createElement(FormattedMessage, {
      id: "login.rememberMe"
    }),
    onChange: e => setIsRemeberMe(e.target.checked),
    defaultChecked: isRemeberMe
  }), /*#__PURE__*/React.createElement("div", {
    className: "divider",
    style: {
      height: '30px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "float-right"
  }, /*#__PURE__*/React.createElement(Link, {
    to: "/forgot-password",
    className: "text-white"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "forgotPassword"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-center"
  }, /*#__PURE__*/React.createElement(Button, {
    color: "primary",
    type: "submit"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "login"
  })))));
};

const phoneRegExp = /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
const formSchema$1 = object().shape({
  fullName: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.fullname.required"
  })),
  email: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.email.required"
  })).email( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.email.invalid"
  })),
  phoneNumber: string().matches(phoneRegExp, () => /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.phoneNumber.invalid"
  })).required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.phoneNumber.required"
  })),
  refCode: string().length(10, () => /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.referalCode.invalid"
  })).matches(phoneRegExp, () => /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.referalCode.invalid"
  }))
});

const Register = () => {
  const [isAppcepted, setIsAppcepted] = useState(false);
  const [isNotApccepted, setIsNotAccepted] = useState(false);
  const history = useHistory();

  const onSubmit = async values => {
    if (!isAppcepted) {
      setIsNotAccepted(true);
      return;
    }

    const res = await AuthService.register(values);

    if (res.status === 200 && res.data) {
      toast.success( /*#__PURE__*/React.createElement(FormattedMessage, {
        id: "register.registerSuccess"
      }));
      history.push('/login');
    }
  };

  const ontoggleAccepted = checked => {
    setIsAppcepted(checked);
    setIsNotAccepted(!checked);
  };

  return /*#__PURE__*/React.createElement(Formik, {
    initialValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      refCode: ''
    },
    onSubmit: onSubmit,
    validationSchema: formSchema$1
  }, ({
    errors,
    touched
  }) => /*#__PURE__*/React.createElement(Form$1, null, /*#__PURE__*/React.createElement(BaseFormGroup, {
    fieldName: "fullName",
    errors: errors,
    touched: touched,
    messageId: "register.fullname"
  }), /*#__PURE__*/React.createElement(FormGroup, {
    className: "form-label-group position-relative"
  }, /*#__PURE__*/React.createElement(Field, {
    name: "email",
    className: `form-control ${errors.email && touched.email && 'is-invalid'}`,
    placeholder: "Email *"
  }), errors.email && touched.email ? /*#__PURE__*/React.createElement("div", {
    className: "text-danger"
  }, errors.email) : null, /*#__PURE__*/React.createElement(Label, null, "Email *")), /*#__PURE__*/React.createElement(BaseFormGroup, {
    fieldName: "phoneNumber",
    errors: errors,
    touched: touched,
    messageId: "register.phoneNumber"
  }), /*#__PURE__*/React.createElement(BaseFormGroup, {
    fieldName: "refCode",
    errors: errors,
    touched: touched,
    messageId: "register.refCode"
  }), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement("div", {
    className: "d-flex align-items-center"
  }, /*#__PURE__*/React.createElement(CheckBox, {
    color: "primary",
    icon: /*#__PURE__*/React.createElement(Check, {
      className: "vx-icon",
      size: 16
    }),
    onChange: e => ontoggleAccepted(e.target.checked),
    defaultChecked: isAppcepted
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.agreeWith"
  }), ' ', /*#__PURE__*/React.createElement("a", {
    className: "text-primary"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.policyAndCondition"
  })), ' ', /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.useService"
  }))), isNotApccepted ? /*#__PURE__*/React.createElement("div", {
    className: "text-danger"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.mustAppcepted"
  })) : null, /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-center mt-2"
  }, /*#__PURE__*/React.createElement(Button, {
    color: "primary",
    type: "submit"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register"
  }))))));
};

const formSchema$2 = object().shape({
  username: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "forgotPassword.username.required"
  })),
  email: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "forgotPassword.email.required"
  })).email( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.email.invalid"
  }))
});

const ForgotPassword = () => {
  const onSubmit = (values, actions) => {
    actions.setSubmitting(false);
  };

  const onClickSuggestion = () => {};

  return /*#__PURE__*/React.createElement(Formik, {
    initialValues: {
      username: '',
      email: ''
    },
    onSubmit: onSubmit,
    validationSchema: formSchema$2
  }, ({
    errors,
    touched
  }) => /*#__PURE__*/React.createElement(Form$1, null, /*#__PURE__*/React.createElement("h4", {
    className: "text-center text-white"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "forgotPassword"
  })), /*#__PURE__*/React.createElement(FormGroup, {
    className: "form-label-group position-relative mt-3"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "forgotPassword.username"
  }, msg => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Field, {
    name: "username",
    className: `form-control ${errors.username && touched.username && 'is-invalid'}`,
    placeholder: msg
  }), errors.username && touched.username ? /*#__PURE__*/React.createElement("div", {
    className: "text-danger"
  }, errors.username) : null, /*#__PURE__*/React.createElement(Label, null, msg)))), /*#__PURE__*/React.createElement(FormGroup, {
    className: "form-label-group position-relative"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "forgotPassword.email"
  }, msg => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FastField, {
    name: "email"
  }, ({
    field,
    form
  }) => /*#__PURE__*/React.createElement(Input, Object.assign({
    className: `${errors.email && touched.email && 'is-invalid not-show-icon'}`,
    placeholder: msg
  }, field, {
    onChange: e => form.setFieldValue('email', e.target.value)
  }))), errors.email && touched.email ? /*#__PURE__*/React.createElement("div", {
    className: "text-danger"
  }, errors.email) : null, /*#__PURE__*/React.createElement("div", {
    className: "form-control-position text-primary cursor-pointer",
    onClick: onClickSuggestion
  }, /*#__PURE__*/React.createElement(Sun, {
    size: 15
  })), /*#__PURE__*/React.createElement(Label, null, msg)))), /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-center"
  }, /*#__PURE__*/React.createElement(Button, {
    color: "primary",
    type: "submit"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "forgotPassword.verify"
  })))));
};

const formSchema$3 = object().shape({
  password: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "createPassword.password.required"
  })),
  enterThePassword: string().oneOf([ref('password'), null], /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "createPassword.passwordMustMatch"
  }))
});

const CreatePassword = ({
  isLanding2
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector$1(state => state.auth.registerToken);
  useEffect(() => {
    const code = new URLSearchParams(document.location.search).get('code') || token;

    if (!code) {
      history.push('/');
    } else {
      dispatch(saveRegisterToken(code));
      history.push(history.location.pathname);
    }
  }, []);

  const onClickContinue = values => {
    dispatch(createPassword(values.password, token));
  };

  return /*#__PURE__*/React.createElement(Formik, {
    initialValues: {
      password: '',
      repeatePassword: ''
    },
    onSubmit: onClickContinue,
    validationSchema: formSchema$3
  }, ({
    errors,
    touched
  }) => /*#__PURE__*/React.createElement(Form$1, {
    className: ""
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-3"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-weight-bold"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "createPassword.title"
  }))), /*#__PURE__*/React.createElement(BaseFormGroup, {
    messageId: "login.password",
    fieldName: "password",
    errors: errors,
    touched: touched
  }), /*#__PURE__*/React.createElement(BaseFormGroup, {
    messageId: "createPassword.enterThePassword",
    fieldName: "repeatePassword",
    errors: errors,
    touched: touched
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "createPassword.condition.1"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "createPassword.condition.2"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "createPassword.condition.3"
  })), /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-center mt-2"
  }, /*#__PURE__*/React.createElement(Button, {
    color: "primary",
    type: "submit"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: isLanding2 ? 'createPassword.continutes' : 'createPassword.done'
  })))));
};

const LandingHeader = ({
  isLanding2
}) => {
  return /*#__PURE__*/React.createElement(Context.Consumer, null, context => {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("img", {
      src: isLanding2 ? IMAGE.LOGO : IMAGE.LOGO_WHITE,
      alt: "logo"
    }), /*#__PURE__*/React.createElement("div", {
      className: "languages d-flex align-items-center "
    }, /*#__PURE__*/React.createElement("div", {
      onClick: () => context.switchLanguage('vi'),
      className: classnames('mr-1 cursor-pointer font-weight-bold', {
        'text-primary': context.state.locale === 'vi'
      })
    }, "VIE"), /*#__PURE__*/React.createElement("div", {
      className: "divider mr-1",
      style: {
        height: '15px'
      }
    }), /*#__PURE__*/React.createElement("div", {
      onClick: () => context.switchLanguage('en'),
      className: classnames('mr-1 cursor-pointer font-weight-bold', {
        'text-primary': context.state.locale === 'en'
      })
    }, "ENG")));
  });
};

const LandingFooter = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: "ld-footer px-1 px-md-3 px-lg-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "d-none d-lg-flex justify-content-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "float-md-left d-block d-md-inline-block mt-25"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "footer.copyRight"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "footer.companySlogan"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "float-md-right d-none d-md-block"
  }, /*#__PURE__*/React.createElement("a", {
    className: "mr-1",
    href: "https://www.apple.com/app-store/",
    target: "_blank"
  }, /*#__PURE__*/React.createElement("img", {
    src: IMAGE.DOWNLOAD_APP_IOS,
    alt: "DOWNLOAD ON APP STORE"
  })), /*#__PURE__*/React.createElement("a", {
    href: "https://play.google.com/store/apps",
    target: "_blank"
  }, /*#__PURE__*/React.createElement("img", {
    src: IMAGE.DOWNLOAD_APP_ANDROID,
    alt: "DOWNLOAD ON APP I"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "d-block d-lg-none text-center"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-center"
  }, /*#__PURE__*/React.createElement("a", {
    className: "mr-1",
    href: "https://www.apple.com/app-store/",
    target: "_blank"
  }, /*#__PURE__*/React.createElement("img", {
    className: "w-90",
    src: IMAGE.DOWNLOAD_APP_IOS,
    alt: "DOWNLOAD ON APP STORE"
  })), /*#__PURE__*/React.createElement("a", {
    href: "https://play.google.com/store/apps",
    target: "_blank"
  }, /*#__PURE__*/React.createElement("img", {
    className: "w-90",
    src: IMAGE.DOWNLOAD_APP_ANDROID,
    alt: "DOWNLOAD ON APP I"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mt-1"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "footer.copyRight"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "footer.companySlogan"
  })))));
};

const LandingPage = props => {
  const [activeTab, setActiveTab] = useState('');
  const history = useHistory();
  const {
    width
  } = useWindowDimensions();
  useEffect(() => {
    setActiveTab(props.activeTab || 'login');
  }, [props.activeTab]);

  const TabView = () => {
    switch (activeTab) {
      case 'login':
        return /*#__PURE__*/React.createElement(Login, null);

      case 'register':
        return /*#__PURE__*/React.createElement(Register, null);

      case 'forgot-password':
        return /*#__PURE__*/React.createElement(ForgotPassword, null);

      case 'reset-password':
        return /*#__PURE__*/React.createElement(CreatePassword, null);

      default:
        return '';
    }
  };

  const goToLink = link => history.push(link);

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "landing-page",
    style: {
      backgroundImage: width > MAX_TABLET_WIDTH ? `url('${IMAGE.LANDING_PAGE_BG}')` : `url('${IMAGE.LANDING_PAGE_TABLET_BG}')`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "position-absolute w-100"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ld-main ml-auto col-12 col-md-6 col-xl-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ld-header d-flex justify-content-between mb-1 mb-md-3 mb-xl-5"
  }, /*#__PURE__*/React.createElement(LandingHeader, null)), /*#__PURE__*/React.createElement("div", {
    className: "lg-content-header d-flex cursor-pointer"
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => goToLink('/login'),
    className: classnames('col-6 text-center tab-control', {
      active: activeTab === 'login'
    })
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "login"
  })), /*#__PURE__*/React.createElement("div", {
    onClick: () => goToLink('/register'),
    className: classnames('col-6 text-center tab-control', {
      active: activeTab === 'register'
    })
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "lg-content p-2 p-md-4 p-lg-5"
  }, /*#__PURE__*/React.createElement(TabView, null))), /*#__PURE__*/React.createElement(LandingFooter, null)));
};

const formSchema$4 = object().shape({
  password: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "createPassword.password.required"
  })),
  enterThePassword: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "createPassword.password.required"
  }))
});

const ProvideNewPassword = () => {
  const [isAppcepted, setIsAppcepted] = useState(false);
  const [isNotApccepted, setIsNotAccepted] = useState(false);

  const onSubmit = (values, actions) => {
    setTimeout(() => {
      if (!isAppcepted) {
        setIsNotAccepted(true);
        return;
      }

      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    }, 1000);
  };

  return /*#__PURE__*/React.createElement(Formik, {
    initialValues: {
      password: '',
      enterThePassword: ''
    },
    onSubmit: onSubmit,
    validationSchema: formSchema$4
  }, ({
    errors,
    touched
  }) => /*#__PURE__*/React.createElement(Form$1, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "d-flex justify-content-center"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "provideNewPassword.title"
  }))), /*#__PURE__*/React.createElement(FormGroup, {
    className: "form-label-group position-relative mt-2"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "provideNewPassword.password"
  }, msg => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FastField, {
    name: "password"
  }, ({
    field,
    form
  }) => /*#__PURE__*/React.createElement(Input, Object.assign({
    type: "password",
    className: `form-control ${errors.password && touched.password && 'is-invalid'}`,
    placeholder: msg
  }, field, {
    onChange: e => form.setFieldValue('password', e.target.value)
  }))), errors.password && touched.password ? /*#__PURE__*/React.createElement("div", {
    className: "text-danger"
  }, errors.password) : null, /*#__PURE__*/React.createElement(Label, null, msg)))), /*#__PURE__*/React.createElement(FormGroup, {
    className: "form-label-group position-relative mt-3"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "provideNewPassword.enterThePassword"
  }, msg => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Field, {
    name: "enterThePassword",
    className: `form-control ${errors.enterThePassword && touched.enterThePassword && 'is-invalid'}`,
    placeholder: msg
  }), errors.enterThePassword && touched.enterThePassword ? /*#__PURE__*/React.createElement("div", {
    className: "text-danger"
  }, errors.enterThePassword) : null, /*#__PURE__*/React.createElement(Label, null, msg)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "createPassword.condition.1"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "createPassword.condition.2"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "createPassword.condition.3"
  })), /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-center mt-2"
  }, /*#__PURE__*/React.createElement(Button, {
    color: "primary",
    type: "submit"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "provideNewPassword.continutes"
  })))));
};

const Select = props => {
  const [inputValue, setInputValue] = useState(props.defaultValue || '');
  const [isFocused, setIsFocused] = useState(false);

  const onChange = (e, actions) => {
    if (props.onChange) {
      props.onChange(e, actions);
    }

    if (props.isMulti) {
      setInputValue(e ? e.map(item => item.value).join() : '');
    } else {
      setInputValue(e ? e.value : '');
    }
  };

  const onFocus = e => {
    if (props.onFocus) {
      props.onChange(e);
    }

    setIsFocused(true);
  };

  const onBlur = e => {
    if (props.onBlur) {
      props.onBlur(e);
    }

    setIsFocused(false);
  };

  return /*#__PURE__*/React.createElement(FormGroup, {
    className: "form-label-group position-relative"
  }, /*#__PURE__*/React.createElement(Select$1, Object.assign({}, props, {
    onChange: onChange,
    onBlur: onBlur,
    onFocus: onFocus,
    theme: theme => ({ ...theme,
      colors: { ...theme.colors,
        primary: '#338955'
      }
    })
  })), /*#__PURE__*/React.createElement("input", {
    className: "d-none",
    placeholder: props.placeholder,
    value: inputValue
  }), /*#__PURE__*/React.createElement(Label, {
    className: classnames({
      'text-primary': isFocused
    })
  }, props.placeholder));
};

const DatePicker = props => /*#__PURE__*/React.createElement(FormGroup, {
  className: "form-label-group position-relative"
}, /*#__PURE__*/React.createElement(Flatpickr, props), /*#__PURE__*/React.createElement(Label, null, props.placeholder));

const CompleteInforValidate = object().shape({
  nbrPer: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "completeInformation.nbrPer.required"
  })),
  dateOfBirth: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "completeInformation.dateOfBirth.required"
  })),
  address: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "completeInformation.address.required"
  })),
  branch: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "completeInformation.branch.required"
  })),
  accountNbr: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "completeInformation.accountNbr.required"
  }))
});
const personalInfoOptions = [{
  value: 'passport',
  label: 'Hộ chiếu',
  color: '#338955',
  isFixed: true
}, {
  value: 'id',
  label: 'Chứng minh nhân dân',
  color: '#338955',
  isFixed: true
}, {
  value: 'idNew',
  label: 'Căn cước công dân',
  color: '#338955',
  isFixed: true
}];
const bank = [{
  value: '1',
  label: 'Tien Phong Bank'
}, {
  value: '2',
  label: 'Vietcombank'
}, {
  value: '3',
  label: 'BIDV'
}];

const CompleteInformation = ({
  intl
}) => {
  const token = useSelector(state => state.auth.registerToken);

  const renderSelect = (option, fieldName, msgField) => {
    return /*#__PURE__*/React.createElement(FormattedMessage, {
      id: msgField
    }, msg => /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Select, {
      placeholder: msg,
      className: "form-label-group position-relative",
      classNamePrefix: "Select",
      name: fieldName,
      options: option,
      onChange: () => {}
    })));
  };

  const onSubmit = values => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    }, 1000);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "completeInfor"
  }, /*#__PURE__*/React.createElement(Formik, {
    initialValues: {
      personalInfo: '',
      nbrPer: '',
      dateOfBirth: '',
      gender: '',
      province: '',
      district: '',
      wards: '',
      address: '',
      gif: '',
      bank: '',
      branch: '',
      accountNbr: ''
    },
    validationSchema: CompleteInforValidate,
    onSubmit: onSubmit
  }, ({
    errors,
    touched
  }) => /*#__PURE__*/React.createElement(Form$1, null, /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    sm: "12",
    lg: "3",
    className: "mb-3"
  }, /*#__PURE__*/React.createElement(Row, {
    className: "ml-2"
  }, /*#__PURE__*/React.createElement(Label, {
    className: "font-weight-bold"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.fullname"
  }))), /*#__PURE__*/React.createElement(Row, {
    className: "ml-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray"
  }, "L\xF2 H\u1ED3ng Ng\u1ECDc")), /*#__PURE__*/React.createElement(Row, {
    className: "ml-2  mt-2"
  }, /*#__PURE__*/React.createElement(Label, {
    className: "font-weight-bold"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.phoneNumber"
  }))), /*#__PURE__*/React.createElement(Row, {
    className: "ml-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray"
  }, "0123456789")), /*#__PURE__*/React.createElement(Row, {
    className: "ml-2  mt-2"
  }, /*#__PURE__*/React.createElement(Label, {
    className: "font-weight-bold"
  }, "Email*")), /*#__PURE__*/React.createElement(Row, {
    className: "ml-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray"
  }, "abc@gmail.com"))), /*#__PURE__*/React.createElement(Col, {
    sm: "12",
    lg: "9"
  }, /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    sm: "6"
  }, renderSelect(personalInfoOptions, 'personalInfo', 'completeInformation.idType')), /*#__PURE__*/React.createElement(Col, {
    sm: "6"
  }, /*#__PURE__*/React.createElement(BaseFormGroup, {
    messageId: "completeInformation.nbrPer",
    fieldName: "nbrPer",
    errors: errors,
    touched: touched
  }))), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    sm: "6"
  }, /*#__PURE__*/React.createElement(DatePicker, {
    className: "form-control bg-white",
    placeholder: intl.formatMessage({
      id: 'completeInformation.dateOfBirth'
    }),
    name: "dateOfBirth",
    value: new Date(),
    options: {
      dateFormat: 'M \\ d \\, Y'
    },
    onChange: date => {}
  })), /*#__PURE__*/React.createElement(Col, {
    sm: "6"
  }, renderSelect(bank, 'gender', 'completeInformation.gender'))), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    sm: "4"
  }, renderSelect(bank, 'province', 'completeInformation.province')), /*#__PURE__*/React.createElement(Col, {
    sm: "4"
  }, renderSelect(bank, 'district', 'completeInformation.district')), /*#__PURE__*/React.createElement(Col, {
    sm: "4"
  }, renderSelect(bank, 'wards', 'completeInformation.wards'))), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    sm: "8"
  }, /*#__PURE__*/React.createElement(BaseFormGroup, {
    messageId: "completeInformation.address",
    fieldName: "address",
    errors: errors,
    touched: touched
  })), /*#__PURE__*/React.createElement(Col, {
    sm: "4"
  }, /*#__PURE__*/React.createElement(BaseFormGroup, {
    messageId: "completeInformation.gif",
    fieldName: "gif",
    errors: errors,
    touched: touched
  }))), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    sm: "4"
  }, renderSelect(bank, 'bank', 'completeInformation.bank')), /*#__PURE__*/React.createElement(Col, {
    sm: "4"
  }, /*#__PURE__*/React.createElement(BaseFormGroup, {
    messageId: "completeInformation.branch",
    fieldName: "branch",
    errors: errors,
    touched: touched
  })), /*#__PURE__*/React.createElement(Col, {
    sm: "4"
  }, /*#__PURE__*/React.createElement(BaseFormGroup, {
    messageId: "completeInformation.accountNbr",
    fieldName: "accountNbr",
    errors: errors,
    touched: touched
  }))), /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-center justify-content-md-end"
  }, /*#__PURE__*/React.createElement(Link, {
    to: "/create-password"
  }, /*#__PURE__*/React.createElement(Button.Ripple, {
    type: "button"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "completeInformation.back"
  }))), /*#__PURE__*/React.createElement(Button.Ripple, {
    type: "submit",
    className: "ml-2"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "completeInformation.done"
  }))))))));
};

var CompleteInformation$1 = injectIntl(CompleteInformation);

const LandingPage2 = props => {
  const [activeTab, setActiveTab] = useState('');
  const history = useHistory();
  useEffect(() => {
    setActiveTab(props.activeTab || 'create-password');
  }, [props.activeTab]);

  const TabView = () => {
    switch (activeTab) {
      case 'create-password':
        return /*#__PURE__*/React.createElement(CreatePassword, null);

      case 'provide-new-password':
        return /*#__PURE__*/React.createElement(ProvideNewPassword, null);

      case 'complete-information':
        return /*#__PURE__*/React.createElement(CompleteInformation$1, {
          isLanding2: true
        });

      default:
        return '';
    }
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "landing-page",
    style: {
      backgroundImage: `url('${IMAGE.LANDING_PAGE_2_BG}')`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-11 mx-auto mb-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ld-main2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ld-header d-flex justify-content-between  mb-5"
  }, /*#__PURE__*/React.createElement(LandingHeader, {
    isLanding2: true
  })), /*#__PURE__*/React.createElement("div", {
    className: classnames('lg-content p-2 p-md-4 p-lg-5 col-12 mx-auto', {
      'col-lg-6 col-md-8': activeTab !== 'complete-information'
    })
  }, /*#__PURE__*/React.createElement(TabView, null)))), /*#__PURE__*/React.createElement(LandingFooter, null)));
};

const AppRouter = props => {
  const {
    checkLoginStatus,
    appId,
    loginStatus,
    isAuthentication,
    authToken,
    children,
    loadNavtigation,
    history,
    message
  } = props;
  useEffect(() => {
    const code = new URLSearchParams(document.location.search).get('code') || authToken;

    if (code && loginStatus !== LOGIN_STATUS.SUCCESS) {
      checkLoginStatus(code);
    }

    if (authToken) {
      loadNavtigation(appId);
    }
  }, [authToken]);

  const setMessages = (message = {}) => {
    const newMessage = {};
    Object.keys(message).forEach(key => {
      newMessage[appId + '.' + key] = message[key];
    });
    return newMessage;
  };

  const appMessage = {
    en: { ...messages_en,
      ...setMessages(message.en)
    },
    vi: { ...messages_vi,
      ...setMessages(message.vi)
    }
  };
  const settingRoutes = [{
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
  const landingPageRoutes = [{
    path: 'login'
  }, {
    path: 'register'
  }, {
    path: 'forgot-password'
  }, {
    path: 'reset-password'
  }];
  const landingPage2Routes = [{
    path: 'create-password'
  }, {
    path: 'provide-new-password'
  }, {
    path: 'complete-information'
  }];
  return /*#__PURE__*/React.createElement(IntlProviderWrapper, {
    appMessage: appMessage
  }, /*#__PURE__*/React.createElement(Router, {
    history: history
  }, /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(Route, {
    path: "/",
    render: props => isAuthentication ? /*#__PURE__*/React.createElement(Layout$1, { ...props,
      appId
    }, /*#__PURE__*/React.createElement(Switch, null, settingRoutes.map(item => /*#__PURE__*/React.createElement(Route, {
      key: item.path,
      path: `/${item.path}`,
      render: () => /*#__PURE__*/React.createElement(item.component, {
        activeTab: item.path
      })
    })), /*#__PURE__*/React.createElement(Route, {
      path: "/",
      render: () => children
    }))) : /*#__PURE__*/React.createElement(Switch, null, landingPageRoutes.map(item => /*#__PURE__*/React.createElement(Route, {
      key: item.path,
      path: `/${item.path}`,
      render: () => /*#__PURE__*/React.createElement(LandingPage, {
        activeTab: item.path
      })
    })), landingPage2Routes.map(item => /*#__PURE__*/React.createElement(Route, {
      key: item.path,
      path: `/${item.path}`,
      render: () => /*#__PURE__*/React.createElement(LandingPage2, {
        activeTab: item.path
      })
    })), /*#__PURE__*/React.createElement(Redirect, {
      from: "/",
      to: "/login"
    }))
  }))), /*#__PURE__*/React.createElement(ToastContainer, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true
  }));
};

const mapStateToProps$3 = state => {
  return {
    isAuthentication: !!state.auth.authToken,
    authToken: state.auth.authToken,
    loginStatus: state.auth.loginStatus
  };
};

var AppRouter$1 = connect(mapStateToProps$3, {
  checkLoginStatus,
  loadNavtigation,
  loginAction
})(AppRouter);

TopBarProgress.config({
  shadowBlur: 5,
  barThickness: 5
});

const LoadingSpinner = ({
  showLoadingBar
}) => {
  return showLoadingBar ? /*#__PURE__*/React.createElement(TopBarProgress, null) : null;
};

const mapStateToProps$4 = state => {
  return {
    showLoadingBar: state.customizer.showLoadingBar
  };
};

var LoadingSpinner$1 = connect(mapStateToProps$4)(LoadingSpinner);

const RippleButton = ({
  rippleColor,
  during,
  block,
  ...rest
}) => /*#__PURE__*/React.createElement(Ripples, {
  color: rippleColor ? rippleColor : "rgba(255, 255, 255, .5)",
  during: during,
  className: `${block ? "d-block" : ""}`
}, /*#__PURE__*/React.createElement(Button, rest));

RippleButton.propTypes = { ...Button.propTypes,
  rippleColor: PropTypes.string,
  during: PropTypes.number
};
Button.Ripple = RippleButton;

const isLocalhost = Boolean(window.location.hostname === 'localhost' || window.location.hostname === '[::1]' || window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));

function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}

const App = ({
  children,
  appId,
  appReducer,
  message,
  apiBaseUrl,
  history
}) => {
  const middlewares = [thunk, createDebounce()];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(rootReducer(appReducer), {}, composeEnhancers(applyMiddleware(...middlewares)));
  const persistor = persistStore(store);
  setBaseHistory(history);
  setUpHttpClient(store);
  return /*#__PURE__*/React.createElement(Provider, {
    store: store
  }, /*#__PURE__*/React.createElement(PersistGate, {
    loading: null,
    persistor: persistor
  }, /*#__PURE__*/React.createElement(LoadingSpinner$1, null), /*#__PURE__*/React.createElement(AppRouter$1, {
    message: message,
    appId: appId,
    history: history,
    children: children
  })));
};

unregister();

class FallbackSpinner extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "fallback-spinner vh-100"
    }, /*#__PURE__*/React.createElement("img", {
      className: "fallback-logo",
      src: IMAGE.LOGO,
      alt: "logo"
    }), /*#__PURE__*/React.createElement("div", {
      className: "loading"
    }, /*#__PURE__*/React.createElement("div", {
      className: "effect-1 effects"
    }), /*#__PURE__*/React.createElement("div", {
      className: "effect-2 effects"
    }), /*#__PURE__*/React.createElement("div", {
      className: "effect-3 effects"
    })));
  }

}

function useDeviceDetect() {
  const [isMobile, setMobile] = React.useState(false);
  React.useEffect(() => {
    const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
    const mobile = Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
    setMobile(mobile);
  }, []);
  return {
    isMobile
  };
}

export { AppId, Autocomplete as AutoComplete, App as BaseApp, BaseFormGroup, CheckBox as Checkbox, DatePicker, FallbackSpinner, HttpClient, Radio, Select, useDeviceDetect, useWindowDimensions };
//# sourceMappingURL=index.modern.js.map
