import React, { Component, PureComponent, useState, useEffect } from 'react';
import { connect, useDispatch, useSelector, Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import createDebounce from 'redux-debounced';
import thunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react';
import { persistReducer, persistStore } from 'redux-persist';
import Axios from 'axios';
import * as Icon from 'react-feather';
import { AlertTriangle, ShoppingCart, FileText, Circle, User, DollarSign, TrendingUp, Award, CreditCard, Share2, Settings, Lock, Power, Search, X, Bell, PlusSquare, DownloadCloud, CheckCircle, File, Menu, Star, Home, List, PlusCircle, Gift, MessageSquare, ArrowUp, Disc, ChevronRight, Check, MapPin, Info, Sun } from 'react-feather';
import { toast, ToastContainer } from 'react-toastify';
export { toast } from 'react-toastify';
import { throttleAdapterEnhancer, cacheAdapterEnhancer } from 'axios-extensions';
import { createBrowserHistory } from 'history';
import sessionStorage from 'redux-persist/es/storage/session';
import { Link, useHistory, Router, Switch, Route, Redirect } from 'react-router-dom';
import classnames from 'classnames';
import { FormGroup, Label, DropdownMenu, DropdownItem, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, Badge, Media, Navbar as Navbar$1, Button, Row, Col, Form, Input, Table, Card, CardHeader, CardTitle, CardBody, Nav, TabContent, TabPane } from 'reactstrap';
export { Button } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { FormattedMessage, IntlProvider } from 'react-intl';
export { FormattedMessage } from 'react-intl';
import ScrollToTop from 'react-scroll-up';
import Hammer from 'react-hammerjs';
import Select$1 from 'react-select';
import chroma from 'chroma-js';
import Flatpickr from 'react-flatpickr';
import { Formik, Form as Form$1, Field, FastField } from 'formik';
import { object, string } from 'yup';
import TopBarProgress from 'react-topbar-progress-indicator';
import Ripples from 'react-ripples';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import 'prismjs/themes/prism-tomorrow.css';

const HttpClient = Axios.create({
  timeout: 5000,
  adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(Axios.defaults.adapter, {
    threshold: 15 * 60 * 1000
  }))
});

HttpClient.addAuthTokenToHeader = authToken => {
  HttpClient.defaults.headers.Authorization = `Bearer ${authToken}`;
};

HttpClient.removeAuthTokenFromHeader = () => {
  delete HttpClient.defaults.headers.Authorization;
};

const errorMessage = message => {
  return /*#__PURE__*/React.createElement("div", {
    className: "d-flex align-items-center"
  }, /*#__PURE__*/React.createElement(AlertTriangle, null), " ", /*#__PURE__*/React.createElement("span", {
    className: "ml-1"
  }, message));
};
const setUpHttpClient = store => {
  HttpClient.interceptors.request.use(config => {
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
      case 404:
        toast.error(errorMessage('API Not Found !'));
        return e.response;

      case 400:
        toast.error(errorMessage('Bad Request !'));
        return e.response;

      case 408:
        toast.error(errorMessage('Request Timeout !'));
        return e.response;

      case 500:
        toast.error(errorMessage('Server error !'));
        return e.response;

      default:
        throw e;
    }
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

const API_LOGIN_URL = 'http://localhost:8086/api/authenticate';
const API_LOGOUT_URL = 'https://api.mocki.io/v1/5e448c60';
const API_GET_NAV_CONFIGS = 'http://localhost:8100/api/roles';
const API_R_200 = 200;
const LOGIN_STATUS = {
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL'
};
const APP_URL = 'http://localhost:3000';
const IMAGE = {
  LOGO: 'https://sit.inon.vn/PortalWeb/nth/assets/images/InOn-logo.png',
  LOGO_WHITE: 'https://firebasestorage.googleapis.com/v0/b/inon-8d496.appspot.com/o/Logo.png?alt=media&token=d61feda7-c2be-423a-9d64-da13dca88b85',
  LANDING_PAGE_BG: 'https://firebasestorage.googleapis.com/v0/b/inon-8d496.appspot.com/o/IO-Signup-01%203%20(1).png?alt=media&token=19aca74e-c81f-40e2-a00d-a91b7ee9f27a',
  DOWNLOAD_APP: 'https://firebasestorage.googleapis.com/v0/b/inon-8d496.appspot.com/o/IO-Landingpage-Final-02.png?alt=media&token=7f24bfce-0e9f-42f8-84e1-c26d8acdd788'
};

const history = createBrowserHistory({
  basename: ''
});

class AuthService {}

AuthService.login = user => {
  return HttpClient.post(API_LOGIN_URL, user);
};

AuthService.logout = user => {
  return HttpClient.post(API_LOGOUT_URL, user);
};

AuthService.checkLoginByToken = () => {
  return HttpClient.get(API_LOGIN_URL);
};

const LOGIN_ACTION = 'LOGIN_ACTION';
const LOGIN_FAIL_ACTION = 'LOGIN_FAIL_ACTION';
const LOOUT_ACTION = 'LOGOUT_ACTION';
const checkLoginStatus = authToken => {
  return async dispatch => {
    try {
      const respone = await AuthService.checkLoginByToken();

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
    } catch (error) {
      dispatch({
        type: LOGIN_ACTION,
        payload: 'authToken'
      });
    }
  };
};
const loginAction = user => {
  return async dispatch => {
    try {
      const respone = await AuthService.login(user);

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
    } catch (error) {
      dispatch({
        type: LOGIN_ACTION,
        payload: 'authToken'
      });
    }
  };
};
const logoutAction = user => {
  return async dispatch => {
    try {
      const respone = await AuthService.logout(user);

      if (respone.status === API_R_200) {
        dispatch({
          type: LOOUT_ACTION
        });
        history.push('/');
      }
    } catch (error) {}
  };
};

const authInitialState = {
  authToken: '',
  user: '',
  loginStatus: ''
};
const authReducers = (state = { ...authInitialState
}, action) => {
  switch (action.type) {
    case LOGIN_ACTION:
      {
        HttpClient.addAuthTokenToHeader(action.payload);
        return { ...state,
          authToken: action.payload,
          loginStatus: LOGIN_STATUS.SUCCESS
        };
      }

    case LOOUT_ACTION:
      {
        HttpClient.removeAuthTokenFromHeader('Authorization');
        return { ...authInitialState
        };
      }

    case LOGIN_FAIL_ACTION:
      {
        return { ...state,
          loginStatus: LOGIN_STATUS.FAIL
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
  const item = {};
  item.id = role.id;
  item.type = 'item';
  item.code = role.code;
  item.appId = role.appId;
  item.title = `menu.${role.keyLang}`;
  item.icon = Icon[role.icon];
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
  return HttpClient.get(API_GET_NAV_CONFIGS);
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

    this.onSuggestionItemClick = (url, e) => {
      if (this.props.onSuggestionClick) {
        this.props.onSuggestionClick(e);
      }

      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: e.currentTarget.innerText
      });
      if (url) history.push(url);
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
              this.onSuggestionItemClick(this.filteredData[activeSuggestion].link, e);
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
            onClick: e => onSuggestionItemClick(item.link, e),
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
            onClick: e => onSuggestionItemClick(suggestion.link ? suggestion.link : null, e),
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
  }

  componentDidUpdate(prevProps) {
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
      filterKey: "title",
      filterHeaderKey: "groupTitle",
      grouped: true,
      placeholder: "Explore Vuexy...",
      autoFocus: true,
      clearInput: this.state.navbarSearch,
      externalClick: e => {
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
          onClick: e => onSuggestionItemClick(item.link, e),
          onMouseEnter: () => onSuggestionItemHover(filteredData.indexOf(item))
        }, /*#__PURE__*/React.createElement("div", {
          className: classnames({
            'd-flex justify-content-between align-items-center': item.file || item.img
          })
        }, /*#__PURE__*/React.createElement("div", {
          className: "item-container d-flex"
        }, item.icon ? /*#__PURE__*/React.createElement(IconTag, {
          size: 17
        }) : item.file ? /*#__PURE__*/React.createElement("img", {
          src: item.file,
          height: "36",
          width: "28",
          alt: item.title
        }) : item.img ? /*#__PURE__*/React.createElement("img", {
          className: "rounded-circle mt-25",
          src: item.img,
          height: "28",
          width: "28",
          alt: item.title
        }) : null, /*#__PURE__*/React.createElement("div", {
          className: "item-info ml-1"
        }, /*#__PURE__*/React.createElement("p", {
          className: "align-middle mb-0"
        }, item.title), item.by || item.email ? /*#__PURE__*/React.createElement("small", {
          className: "text-muted"
        }, item.by ? item.by : item.email ? item.email : null) : null)), item.size || item.date ? /*#__PURE__*/React.createElement("div", {
          className: "meta-container"
        }, /*#__PURE__*/React.createElement("small", {
          className: "text-muted"
        }, item.size ? item.size : item.date ? item.date : null)) : null));
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
    }, this.props.userName), /*#__PURE__*/React.createElement("span", {
      className: "user-status"
    }, "Available")), /*#__PURE__*/React.createElement("span", {
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
    className: "nav navbar-nav bookmark-icons"
  }, /*#__PURE__*/React.createElement(NavItem, null, /*#__PURE__*/React.createElement(NavLink, null, /*#__PURE__*/React.createElement(Star, {
    className: "text-warning",
    size: 21
  })))))), /*#__PURE__*/React.createElement(NavbarUser, {
    handleAppOverlay: props.handleAppOverlay,
    changeCurrentLang: props.changeCurrentLang,
    userName: props.name,
    roles: props.roles,
    isAuthenticated: props.isAuthenticated,
    logoutAction: props.logoutAction
  }))))));
};

const mapStateToProps = state => {
  return {
    name: state.auth.name,
    isAuthenticated: !!state.auth.name,
    roles: state.navbar.roles
  };
};

var Navbar = connect(mapStateToProps, {
  logoutAction
})(ThemeNavbar);

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

const Footer = props => {
  const {
    isMobile
  } = useDeviceDetect();
  return /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("div", {
    className: classnames('footer footer-light', {
      'd-none': isMobile
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
  }, /*#__PURE__*/React.createElement("img", {
    src: IMAGE.DOWNLOAD_APP,
    alt: "DOWNLOAD ON APP STORE"
  })))), /*#__PURE__*/React.createElement("div", {
    className: classnames('footer footer-light footer-mobile', {
      'd-none': !isMobile
    })
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
    className: "tab-link",
    href: "#"
  }, /*#__PURE__*/React.createElement(Home, null))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
    className: "tab-link",
    href: "#"
  }, /*#__PURE__*/React.createElement(List, null))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
    className: "tab-link",
    href: "#"
  }, /*#__PURE__*/React.createElement(PlusCircle, null))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
    className: "tab-link",
    href: "#"
  }, /*#__PURE__*/React.createElement(Gift, null))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
    className: "tab-link"
  }, /*#__PURE__*/React.createElement(MessageSquare, null)))), props.hideScrollToTop === false ? /*#__PURE__*/React.createElement(ScrollToTop, {
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

const LOAD_NATIVGATION$1 = 'LOAD_NATIVGATION';
const loadNavtigation = appId => {
  return async dispatch => {
    try {
      const res = await NavBarService.getNativagtion();
      const roles = res.data;
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

class SidebarHeader extends Component {
  render() {
    let {
      toggleSidebarMenu,
      activeTheme,
      collapsed,
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
    }, /*#__PURE__*/React.createElement(NavLink, {
      to: "/"
    }, /*#__PURE__*/React.createElement("img", {
      className: "img-fluid logo-img",
      src: IMAGE.LOGO,
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
      this.props.loadNavtigation();

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
      sidebarVisibility: this.handleSidebarVisibility,
      currentLang: this.state.currentLang,
      changeCurrentLang: this.handleCurrentLanguage,
      handleAppOverlay: this.handleAppOverlay,
      appOverlayState: this.state.appOverlay,
      navbarColor: appProps.navbarColor,
      navbarType: appProps.navbarType
    };
    const footerProps = {
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
  hideScrollToTop,
  loadNavtigation
})(Layout);

const Context = React.createContext();

class IntlProviderWrapper extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      locale: 'vi',
      messages: this.props.appMessage['vi']
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

const formSchema = object().shape({
  username: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "login.username.required"
  })),
  password: string().required( /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "login.password.required"
  }))
});

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const loginStatus = useSelector(state => state.auth.loginStatus);

  const onSubmit = (values, actions) => {
    dispatch(loginAction({
      username: values.username,
      password: values.password,
      rememberMe
    }));
    actions.setSubmitting(false);
  };

  return /*#__PURE__*/React.createElement(Formik, {
    initialValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      referalCode: ''
    },
    onSubmit: onSubmit,
    validationSchema: formSchema
  }, ({
    errors,
    touched
  }) => /*#__PURE__*/React.createElement(Form$1, null, /*#__PURE__*/React.createElement("h4", {
    className: "text-center text-white"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "login.firstWelcome"
  }), loginStatus === LOGIN_STATUS.FAIL ? /*#__PURE__*/React.createElement("div", {
    className: "text-danger mt-1"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "login.fail"
  })) : ''), /*#__PURE__*/React.createElement(FormGroup, {
    className: "form-label-group position-relative mt-3"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "login.username"
  }, msg => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Field, {
    name: "username",
    className: `form-control ${errors.username && touched.username && 'is-invalid'}`,
    placeholder: msg
  }), errors.username && touched.username ? /*#__PURE__*/React.createElement("div", {
    className: "text-danger"
  }, errors.username) : null, /*#__PURE__*/React.createElement(Label, null, msg)))), /*#__PURE__*/React.createElement(FormGroup, {
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
  }, /*#__PURE__*/React.createElement(CheckBox, {
    color: "primary",
    icon: /*#__PURE__*/React.createElement(Check, {
      className: "vx-icon",
      size: 16
    }),
    label: /*#__PURE__*/React.createElement(FormattedMessage, {
      id: "login.rememberMe"
    }),
    onChange: e => setRememberMe(e.target.checked),
    defaultChecked: rememberMe
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

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
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
  }))
});

const Register = () => {
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

  const ontoggleAccepted = checked => {
    setIsAppcepted(checked);
    setIsNotAccepted(!checked);
  };

  return /*#__PURE__*/React.createElement(Formik, {
    initialValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      referalCode: ''
    },
    onSubmit: onSubmit,
    validationSchema: formSchema$1
  }, ({
    errors,
    touched
  }) => /*#__PURE__*/React.createElement(Form$1, null, /*#__PURE__*/React.createElement(FormGroup, {
    className: "form-label-group position-relative"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.fullname"
  }, msg => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Field, {
    name: "fullName",
    className: `form-control ${errors.fullName && touched.fullName && 'is-invalid'}`,
    placeholder: msg
  }), errors.fullName && touched.fullName ? /*#__PURE__*/React.createElement("div", {
    className: "text-danger"
  }, errors.fullName) : null, /*#__PURE__*/React.createElement(Label, null, msg)))), /*#__PURE__*/React.createElement(FormGroup, {
    className: "form-label-group position-relative"
  }, /*#__PURE__*/React.createElement(Field, {
    name: "email",
    className: `form-control ${errors.email && touched.email && 'is-invalid'}`,
    placeholder: "Email *"
  }), errors.email && touched.email ? /*#__PURE__*/React.createElement("div", {
    className: "text-danger"
  }, errors.email) : null, /*#__PURE__*/React.createElement(Label, null, "Email *")), /*#__PURE__*/React.createElement(FormGroup, {
    className: "form-label-group position-relative"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.phoneNumber"
  }, msg => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Field, {
    name: "phoneNumber",
    className: `form-control ${errors.phoneNumber && touched.phoneNumber && 'is-invalid'}`,
    placeholder: msg
  }), errors.phoneNumber && touched.phoneNumber ? /*#__PURE__*/React.createElement("div", {
    className: "text-danger"
  }, errors.phoneNumber) : null, /*#__PURE__*/React.createElement(Label, null, msg)))), /*#__PURE__*/React.createElement(FormGroup, {
    className: "form-label-group position-relative"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "register.referalCode"
  }, msg => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Field, {
    name: "referalCode",
    className: "form-control",
    placeholder: msg
  }), /*#__PURE__*/React.createElement(Label, null, msg)))), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement("div", {
    className: "d-flex align-items-center"
  }, /*#__PURE__*/React.createElement(CheckBox, {
    color: "primary",
    icon: /*#__PURE__*/React.createElement(Check, {
      className: "vx-icon",
      size: 16
    }),
    onChange: e => ontoggleAccepted(e.target.checked),
    defaultChecked: isAppcepted
  }), /*#__PURE__*/React.createElement("div", null, "T\xF4i \u0111\u1ED3ng \xFD v\u1EDBi", ' ', /*#__PURE__*/React.createElement("a", {
    className: "text-primary"
  }, "\u0110i\u1EC1u kho\u1EA3n v\xE0 \u0110i\u1EC1u ki\u1EC7n"), " s\u1EED d\u1EE5ng d\u1ECBch v\u1EE5.")), isNotApccepted ? /*#__PURE__*/React.createElement("div", {
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
    className: "form-control-position"
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

const LandingPage = props => {
  const [activeTab, setActiveTab] = useState('');
  const history = useHistory();
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

      default:
        return '';
    }
  };

  const goToLink = link => history.push(link);

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "landing-page",
    style: {
      background: `url('${IMAGE.LANDING_PAGE_BG}')`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ld-main ml-auto col-12 col-md-6 col-lg-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ld-header d-flex justify-content-between mb-5"
  }, /*#__PURE__*/React.createElement(Context.Consumer, null, context => {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("img", {
      src: IMAGE.LOGO_WHITE,
      alt: "logo"
    }), /*#__PURE__*/React.createElement("div", {
      className: "languages d-flex align-items-center"
    }, /*#__PURE__*/React.createElement("div", {
      onClick: () => context.switchLanguage('vi'),
      className: classnames('mr-1 cursor-pointer', {
        'text-primary': context.state.locale === 'vi'
      })
    }, "VIE"), /*#__PURE__*/React.createElement("div", {
      className: "divider mr-1",
      style: {
        height: '15px'
      }
    }), /*#__PURE__*/React.createElement("div", {
      onClick: () => context.switchLanguage('en'),
      className: classnames('mr-1 cursor-pointer', {
        'text-primary': context.state.locale === 'en'
      })
    }, "ENG")));
  })), /*#__PURE__*/React.createElement("div", {
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
  }, /*#__PURE__*/React.createElement(TabView, null))), /*#__PURE__*/React.createElement("div", {
    className: "ld-footer px-5"
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
  }, /*#__PURE__*/React.createElement("img", {
    src: IMAGE.DOWNLOAD_APP,
    alt: "DOWNLOAD ON APP STORE"
  }))))));
};

const AppRouter = props => {
  const {
    checkLoginStatus,
    appId,
    loginStatus,
    isAuthentication,
    authToken,
    children,
    message
  } = props;
  useEffect(() => {
    const code = new URLSearchParams(document.location.search).get('code') || authToken;

    if (code && loginStatus !== LOGIN_STATUS.SUCCESS) {
      HttpClient.addAuthTokenToHeader(code);
      checkLoginStatus(code);
    }
  }, []);

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
  }];
  return /*#__PURE__*/React.createElement(IntlProviderWrapper, {
    appMessage: appMessage
  }, /*#__PURE__*/React.createElement(Router, {
    history: history
  }, /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(Route, {
    path: "/",
    render: props => isAuthentication ? /*#__PURE__*/React.createElement(Layout$1, props, /*#__PURE__*/React.createElement(Switch, null, settingRoutes.map(item => /*#__PURE__*/React.createElement(Route, {
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
    })), /*#__PURE__*/React.createElement(Redirect, {
      from: "/",
      to: "/login"
    }))
  }))));
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
  navigationConfig
}) => {
  const middlewares = [thunk, createDebounce()];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(rootReducer(appReducer), {}, composeEnhancers(applyMiddleware(...middlewares)));
  const persistor = persistStore(store);
  setUpHttpClient(store);
  return /*#__PURE__*/React.createElement(Provider, {
    store: store
  }, /*#__PURE__*/React.createElement(PersistGate, {
    loading: null,
    persistor: persistor
  }, /*#__PURE__*/React.createElement(LoadingSpinner$1, null), /*#__PURE__*/React.createElement(AppRouter$1, {
    message: message,
    appId: appId,
    children: children
  }), /*#__PURE__*/React.createElement(ToastContainer, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true
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

const DatePicker = props => /*#__PURE__*/React.createElement(FormGroup, {
  className: "form-label-group position-relative"
}, /*#__PURE__*/React.createElement(Flatpickr, props), /*#__PURE__*/React.createElement(Label, null, props.placeholder));

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

export { AppId, Autocomplete as AutoComplete, App as BaseApp, DatePicker, FallbackSpinner, HttpClient, Radio, Select, useDeviceDetect, useWindowDimensions };
//# sourceMappingURL=index.modern.js.map
