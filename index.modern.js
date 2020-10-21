import React, { useState, Component, PureComponent, useEffect } from 'react';
import { connect, Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import createDebounce from 'redux-debounced';
import thunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react';
import { persistReducer, persistStore } from 'redux-persist';
import Axios from 'axios';
import * as Icon from 'react-feather';
import { AlertTriangle, ShoppingCart, FileText, Circle, User, DollarSign, TrendingUp, Award, CreditCard, Share2, Mail, Lock, Check, Disc, X, ChevronRight, Settings, Power, Search, Bell, PlusSquare, DownloadCloud, CheckCircle, File, Menu, Star, Heart, Home, List, PlusCircle, Gift, MessageSquare, ArrowUp, Info, Instagram, Link as Link$1 } from 'react-feather';
import { toast, ToastContainer } from 'react-toastify';
export { toast } from 'react-toastify';
import { throttleAdapterEnhancer, cacheAdapterEnhancer } from 'axios-extensions';
import { createBrowserHistory } from 'history';
import sessionStorage from 'redux-persist/es/storage/session';
import { Link, NavLink as NavLink$1, Router, Switch, Route } from 'react-router-dom';
import { FormattedMessage, IntlProvider } from 'react-intl';
export { FormattedMessage } from 'react-intl';
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Form, FormGroup, Input, Label, Button, NavLink, Badge, DropdownMenu, DropdownItem, Dropdown, DropdownToggle, NavItem, UncontrolledDropdown, Media, Navbar as Navbar$1, Alert, CustomInput, Breadcrumb, BreadcrumbItem, Nav, TabContent, TabPane } from 'reactstrap';
export { Button } from 'reactstrap';
import classnames from 'classnames';
import Hammer from 'react-hammerjs';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ReactCountryFlag from 'react-country-flag';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ScrollToTop from 'react-scroll-up';
import { Formik, Form as Form$1, Field } from 'formik';
import { object, string, ref } from 'yup';
import Select from 'react-select';
import chroma from 'chroma-js';
import Flatpickr from 'react-flatpickr';
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

    switch (e.response.status) {
      case 404:
        toast.error(errorMessage('API Not Found !'));
        break;

      case 400:
        toast.error(errorMessage('Bad Request !'));
        break;

      case 408:
        toast.error(errorMessage('Request Timeout !'));
        break;

      case 500:
        toast.error(errorMessage('Server error !'));
        break;
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

const API_LOGIN_URL = 'https://api.mocki.io/v1/5e448c60';
const API_LOGOUT_URL = 'https://api.mocki.io/v1/5e448c60';
const API_R_200 = 200;
const APP_URL = 'http://localhost:3000';
const IMAGE = {
  LOGO: 'https://sit.inon.vn/PortalWeb/nth/assets/images/InOn-logo.png'
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

AuthService.checkLoginByToken = authToken => {
  return HttpClient.post(API_LOGIN_URL, authToken);
};

const LOGIN_ACTION = 'LOGIN_ACTION';
const LOOUT_ACTION = 'LOGOUT_ACTION';
const checkLoginStatus = code => {
  return async dispatch => {
    if (!code) {
      return;
    }

    try {
      const respone = await AuthService.checkLoginByToken(code);

      if (respone.status === API_R_200) {
        dispatch({
          type: LOGIN_ACTION,
          payload: respone.data
        });
      } else {
        dispatch({
          type: LOOUT_ACTION
        });
        history.push('/');
      }
    } catch (error) {
      console.log(error);
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
          payload: respone.data
        });
        history.push('/');
      }
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
    }
  };
};

const authInitialState = {
  authToken: '',
  username: '',
  name: '',
  role: ''
};
const authReducers = (state = { ...authInitialState
}, action) => {
  switch (action.type) {
    case LOGIN_ACTION:
      {
        return { ...state,
          ...action.payload
        };
      }

    case LOOUT_ACTION:
      {
        return { ...authInitialState
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

const getNativgationConfig = (appId, navConfigs = navigationConfig) => {
  return navConfigs.map(item => {
    item.isExternalApp = item.appId !== appId;
    item.type = 'item';

    if (item.children) {
      item.children.map(child => child.isExternalApp = child.appId !== appId);

      if (item.children.length === 1) {
        item.type = 'item';
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
  return HttpClient.post(API_LOGIN_URL);
};

const LOAD_NATIVGATION = 'LOAD_NATIVGATION';

const initialState = {
  navConfigs: []
};

const navbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NATIVGATION:
      return { ...state,
        navConfigs: [...action.payload]
      };

    default:
      return state;
  }
};

const rootReducer = appReducer => combineReducers({
  customizer: customizerReducer,
  auth: persistReducer({
    storage: sessionStorage,
    key: 'root'
  }, authReducers),
  navbar: navbarReducer,
  app: appReducer
});

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

const Login = ({
  loginAction
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onClickLogin = () => {
    loginAction({
      username,
      password
    });
  };

  return /*#__PURE__*/React.createElement(Row, {
    className: "m-0 justify-content-center"
  }, /*#__PURE__*/React.createElement(Col, {
    sm: "8",
    xl: "7",
    lg: "10",
    md: "8",
    className: "d-flex justify-content-center"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "bg-authentication login-card rounded-0 mb-0 w-100"
  }, /*#__PURE__*/React.createElement(Row, {
    className: "m-0"
  }, /*#__PURE__*/React.createElement(Col, {
    lg: "6",
    className: "d-lg-block d-none text-center align-self-center px-1 py-0"
  }, /*#__PURE__*/React.createElement("img", {
    src: '',
    alt: "loginImg"
  })), /*#__PURE__*/React.createElement(Col, {
    lg: "6",
    md: "12",
    className: "p-0"
  }, /*#__PURE__*/React.createElement(Card, {
    className: "rounded-0 mb-0 px-2 login-tabs-container"
  }, /*#__PURE__*/React.createElement(CardHeader, {
    className: "pb-1"
  }, /*#__PURE__*/React.createElement(CardTitle, null, /*#__PURE__*/React.createElement("h4", {
    className: "mb-0"
  }, "Login"))), /*#__PURE__*/React.createElement("p", {
    className: "px-2 auth-title"
  }, "Welcome back, please login to your account."), /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CardBody, {
    className: "pt-1"
  }, /*#__PURE__*/React.createElement(Form, {
    action: "/",
    onSubmit: e => e.preventDefault()
  }, /*#__PURE__*/React.createElement(FormGroup, {
    className: "form-label-group position-relative has-icon-left"
  }, /*#__PURE__*/React.createElement(Input, {
    type: "email",
    placeholder: "Email",
    required: true
  }), /*#__PURE__*/React.createElement("div", {
    className: "form-control-position"
  }, /*#__PURE__*/React.createElement(Mail, {
    size: 15
  })), /*#__PURE__*/React.createElement(Label, null, "Email")), /*#__PURE__*/React.createElement(FormGroup, {
    className: "form-label-group position-relative has-icon-left"
  }, /*#__PURE__*/React.createElement(Input, {
    type: "password",
    placeholder: "Password",
    required: true
  }), /*#__PURE__*/React.createElement("div", {
    className: "form-control-position"
  }, /*#__PURE__*/React.createElement(Lock, {
    size: 15
  })), /*#__PURE__*/React.createElement(Label, null, "Password")), /*#__PURE__*/React.createElement(FormGroup, {
    className: "d-flex justify-content-between align-items-center"
  }, /*#__PURE__*/React.createElement(CheckBox, {
    color: "primary",
    icon: /*#__PURE__*/React.createElement(Check, {
      className: "vx-icon",
      size: 16
    }),
    label: "Remember me",
    defaultChecked: false
  }), /*#__PURE__*/React.createElement("div", {
    className: "float-right"
  }, /*#__PURE__*/React.createElement(Link, {
    to: "/pages/forgot-password"
  }, "Forgot Password?"))), /*#__PURE__*/React.createElement("div", {
    className: "d-flex justify-content-between"
  }, /*#__PURE__*/React.createElement(Button.Ripple, {
    color: "primary",
    outline: true,
    onClick: () => {
      history.push('/pages/register');
    }
  }, "Register"), /*#__PURE__*/React.createElement(Button.Ripple, {
    color: "primary",
    type: "submit",
    onClick: onClickLogin
  }, "Login")))))))))));
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

const mapStateToProps = state => {
  return {
    currentUser: state.auth,
    navConfigs: state.navbar.navConfigs
  };
};

var Sidebar$1 = connect(mapStateToProps)(Sidebar);

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
    }), suggestionsListComponent);
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
    onClick: e => handleNavigation(e, '/account-settings')
  }, /*#__PURE__*/React.createElement(Settings, {
    size: 14,
    className: "mr-50"
  }), /*#__PURE__*/React.createElement("span", {
    className: "align-middle"
  }, /*#__PURE__*/React.createElement(FormattedMessage, {
    id: "setting"
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
      langDropdown: false,
      suggestions: []
    };

    this.handleNavbarSearch = () => {
      this.setState({
        navbarSearch: !this.state.navbarSearch
      });
    };

    this.handleLangDropdown = () => this.setState({
      langDropdown: !this.state.langDropdown
    });

    this.getCountryCode = locale => {
      const countryCode = {
        en: 'us',
        vi: 'vn'
      };
      return countryCode[locale];
    };
  }

  componentDidMount() {}

  render() {
    return /*#__PURE__*/React.createElement("ul", {
      className: "nav navbar-nav navbar-nav-user float-right"
    }, /*#__PURE__*/React.createElement(Context.Consumer, null, context => {
      return /*#__PURE__*/React.createElement(Dropdown, {
        tag: "li",
        className: "dropdown-language nav-item",
        isOpen: this.state.langDropdown,
        toggle: this.handleLangDropdown,
        "data-tour": "language"
      }, /*#__PURE__*/React.createElement(DropdownToggle, {
        tag: "a",
        className: "nav-link"
      }, /*#__PURE__*/React.createElement(ReactCountryFlag, {
        className: "country-flag",
        countryCode: this.getCountryCode(context.state.locale),
        svg: true
      }), /*#__PURE__*/React.createElement("span", {
        className: "d-sm-inline-block d-none text-capitalize align-middle ml-50"
      }, /*#__PURE__*/React.createElement(FormattedMessage, {
        id: `navbar.language.${context.state.locale}`
      }))), /*#__PURE__*/React.createElement(DropdownMenu, {
        right: true
      }, /*#__PURE__*/React.createElement(DropdownItem, {
        tag: "a",
        onClick: e => context.switchLanguage('en')
      }, /*#__PURE__*/React.createElement(ReactCountryFlag, {
        className: "country-flag",
        countryCode: "us",
        svg: true
      }), /*#__PURE__*/React.createElement("span", {
        className: "ml-1"
      }, /*#__PURE__*/React.createElement(FormattedMessage, {
        id: "navbar.language.en"
      }))), /*#__PURE__*/React.createElement(DropdownItem, {
        tag: "a",
        onClick: e => context.switchLanguage('vi')
      }, /*#__PURE__*/React.createElement(ReactCountryFlag, {
        className: "country-flag",
        countryCode: "vn",
        svg: true
      }), /*#__PURE__*/React.createElement("span", {
        className: "ml-1"
      }, /*#__PURE__*/React.createElement(FormattedMessage, {
        id: "navbar.language.vi"
      })))));
    }), /*#__PURE__*/React.createElement(NavItem, {
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
    isAuthenticated: props.isAuthenticated,
    logoutAction: props.logoutAction
  }))))));
};

const mapStateToProps$1 = state => {
  return {
    name: state.auth.name,
    isAuthenticated: !!state.auth.name
  };
};

var Navbar = connect(mapStateToProps$1, {
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
  }, /*#__PURE__*/React.createElement("span", {
    className: "align-middle"
  }, "Hand-crafted & Made with"), ' ', /*#__PURE__*/React.createElement(Heart, {
    className: "text-danger",
    size: 15
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
    }, /*#__PURE__*/React.createElement(Navbar, navbarProps), /*#__PURE__*/React.createElement("div", {
      className: "content-wrapper"
    }, this.props.children)), /*#__PURE__*/React.createElement(Footer, footerProps), /*#__PURE__*/React.createElement("div", {
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
    const res = await NavBarService.getNativagtion();
    const navCofigs = getNativgationConfig(appId);
    dispatch({
      type: LOAD_NATIVGATION$1,
      payload: navCofigs
    });
  };
};

const FullPageLayout = ({
  children,
  ...rest
}) => {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'url("https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/static/media/vuesax-login-bg.eb4e894d.jpg")'
    },
    className: classnames('full-layout wrapper bg-full-screen-image blank-page dark-layout', {
      'layout-dark': themeConfig.layoutDark
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: "app-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "content-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "content-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flexbox-container"
  }, /*#__PURE__*/React.createElement("main", {
    className: "main w-100"
  }, children))))));
};

var setting = "Setting";
var messages_en = {
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
	"setting.personal": "Personal",
	"setting.application": "Application",
	"setting.notification": "Notification",
	"setting.deviceManagement": "Device Management",
	"setting.language": "Language",
	"setting.term": "Terms of use",
	"setting.general": "General",
	"setting.privacyPolicy": "Privacy Policy",
	"setting.frequentlyAsked": "Frequently Asked",
	"setting.conntact": "Contact InOn",
	"setting.feedback": "Feedback",
	"setting.share": "Share",
	"setting.status.COMPLETE": "Your account had completed information",
	"setting.status.UNCOMPLETE": "Account need additional information",
	"setting.gender.M": "Male",
	"setting.gender.F": "FeMale",
	"setting.gender.O": "Others",
	"changePassword.passwordMustMatch": "Password must match"
};

var setting$1 = "Cài đặt";
var messages_vi = {
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
	"setting.personal": "Cá nhân",
	"setting.application": "Ứng dụng",
	"setting.notification": "Thông báo",
	"setting.deviceManagement": "Quản lý thiết bị",
	"setting.language": "Ngôn ngữ",
	"setting.term": "Điều khoản sử dụng",
	"setting.general": "Chung",
	"setting.privacyPolicy": "Chính sách bảo mật",
	"setting.frequentlyAsked": "Câu hỏi thường gặp",
	"setting.conntact": "Liên hệ InOn",
	"setting.feedback": "Góp ý, báo lỗi",
	"setting.share": "Chia sẻ",
	"setting.status.COMPLETE": "Tài khoản đã hoàn thiện thông tin",
	"setting.status.UNCOMPLE": "Tài khoản cần bổ sung thông tin",
	"setting.gender.M": "Name",
	"setting.gender.F": "Nữ",
	"setting.gender.O": "Khác",
	"changePassword.passwordMustMatch": "Mật khẩu không trùng khớp"
};

class General extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      visible: true
    };

    this.dismissAlert = () => {
      this.setState({
        visible: false
      });
    };
  }

  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Media, null, /*#__PURE__*/React.createElement(Media, {
      className: "mr-1",
      left: true,
      href: "#"
    }, /*#__PURE__*/React.createElement(Media, {
      className: "rounded-circle",
      object: true,
      src: 'https://storage.live.com/Users/-6155523327610065665/MyProfile/ExpressionProfile/ProfilePhoto:Win8Static,UserTileMedium,UserTileStatic',
      alt: "User",
      height: "64",
      width: "64"
    })), /*#__PURE__*/React.createElement(Media, {
      className: "mt-25",
      body: true
    }, /*#__PURE__*/React.createElement("div", {
      className: "d-flex flex-sm-row flex-column justify-content-start px-0"
    }, /*#__PURE__*/React.createElement(Button.Ripple, {
      tag: "label",
      className: "mr-50 cursor-pointer",
      color: "primary",
      outline: true
    }, "Upload Photo", /*#__PURE__*/React.createElement(Input, {
      type: "file",
      name: "file",
      id: "uploadImg",
      hidden: true
    })), /*#__PURE__*/React.createElement(Button.Ripple, {
      color: "flat-danger"
    }, "Remove")), /*#__PURE__*/React.createElement("p", {
      className: "text-muted mt-50"
    }, /*#__PURE__*/React.createElement("small", null, "Allowed JPG, GIF or PNG. Max size of 800kB")))), /*#__PURE__*/React.createElement(Form, {
      className: "mt-2",
      onSubmit: e => e.preventDefault()
    }, /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
      sm: "12"
    }, /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "userName"
    }, "Username"), /*#__PURE__*/React.createElement(Input, {
      id: "userName",
      defaultValue: "johny_01"
    }))), /*#__PURE__*/React.createElement(Col, {
      sm: "12"
    }, /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "name"
    }, "Name"), /*#__PURE__*/React.createElement(Input, {
      id: "name",
      defaultValue: "John Doe"
    }))), /*#__PURE__*/React.createElement(Col, {
      sm: "12"
    }, /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "email"
    }, "Email"), /*#__PURE__*/React.createElement(Input, {
      id: "email",
      defaultValue: "john@admin.com"
    }))), /*#__PURE__*/React.createElement(Col, {
      sm: "12"
    }, /*#__PURE__*/React.createElement(Alert, {
      className: "mb-2",
      color: "warning",
      isOpen: this.state.visible,
      toggle: this.dismissAlert
    }, /*#__PURE__*/React.createElement("p", {
      className: "mb-0"
    }, "Your email is not confirmed. Please check your inbox.", /*#__PURE__*/React.createElement("span", {
      className: "text-primary"
    }, " Resend Confirmation")))), /*#__PURE__*/React.createElement(Col, {
      sm: "12"
    }, /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "company"
    }, "Company"), /*#__PURE__*/React.createElement(Input, {
      id: "company",
      defaultValue: "SnowMash Technologies Pvt Ltd"
    }))), /*#__PURE__*/React.createElement(Col, {
      className: "d-flex justify-content-start flex-wrap",
      sm: "12"
    }, /*#__PURE__*/React.createElement(Button.Ripple, {
      className: "mr-50",
      type: "submit",
      color: "primary"
    }, "Save Changes"), /*#__PURE__*/React.createElement(Button.Ripple, {
      type: "submit",
      color: "danger"
    }, "Cancel")))));
  }

}

const formSchema = object().shape({
  oldpass: string().required("Required"),
  newpass: string().required("Required"),
  confirmpass: string().oneOf([ref("newpass"), null], "Passwords must match").required("Required")
});

class ChangePassword extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Row, {
      className: "pt-1"
    }, /*#__PURE__*/React.createElement(Col, {
      sm: "12"
    }, /*#__PURE__*/React.createElement(Formik, {
      initialValues: {
        oldpass: "",
        newpass: "",
        confirmpass: ""
      },
      validationSchema: formSchema
    }, ({
      errors,
      touched
    }) => /*#__PURE__*/React.createElement(Form$1, null, /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Field, {
      name: "oldpass",
      id: "oldpass",
      className: `form-control ${errors.oldpass && touched.oldpass && "is-invalid"}`,
      placeholder: "Old Password"
    }), errors.oldpass && touched.oldpass ? /*#__PURE__*/React.createElement("div", {
      className: "text-danger"
    }, errors.oldpass) : null), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Field, {
      name: "newpass",
      placeholder: "New Password",
      id: "newpass",
      className: `form-control ${errors.newpass && touched.newpass && "is-invalid"}`
    }), errors.newpass && touched.newpass ? /*#__PURE__*/React.createElement("div", {
      className: "text-danger"
    }, errors.newpass) : null), /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Field, {
      name: "confirmpass",
      id: "confirmpass",
      className: `form-control ${errors.confirmpass && touched.confirmpass && "is-invalid"}`,
      placeholder: "Confirm Password"
    }), errors.confirmpass && touched.confirmpass ? /*#__PURE__*/React.createElement("div", {
      className: "text-danger"
    }, errors.confirmpass) : null), /*#__PURE__*/React.createElement("div", {
      className: "d-flex justify-content-start flex-wrap"
    }, /*#__PURE__*/React.createElement(Button.Ripple, {
      className: "mr-1 mb-1",
      color: "primary",
      type: "submit"
    }, "Save Changes"), /*#__PURE__*/React.createElement(Button.Ripple, {
      className: "mb-1",
      color: "danger",
      type: "reset",
      outline: true
    }, "Cancel")))))));
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

class InfoTab extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      dob: new Date()
    };

    this.handleDob = date => {
      this.setState({
        dob: date
      });
    };
  }

  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Form, {
      onSubmit: e => e.preventDefault()
    }, /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
      sm: "12"
    }, /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "bio"
    }, "Bio"), /*#__PURE__*/React.createElement(Input, {
      type: "textarea",
      name: "bio",
      id: "bio",
      rows: "3",
      placeholder: "Your bio data here..."
    }))), /*#__PURE__*/React.createElement(Col, {
      sm: "12"
    }, /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      className: "d-block",
      for: "date"
    }, "Date"), /*#__PURE__*/React.createElement(Flatpickr, {
      className: "form-control",
      options: {
        dateFormat: 'M \\ d \\, Y'
      },
      value: this.state.dob,
      onChange: date => this.handleDob(date)
    }))), /*#__PURE__*/React.createElement(Col, {
      sm: "12"
    }, /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "country"
    }, "Country"), /*#__PURE__*/React.createElement(Input, {
      type: "select",
      name: "country",
      id: "country"
    }, /*#__PURE__*/React.createElement("option", null, "US"), /*#__PURE__*/React.createElement("option", null, "UK"), /*#__PURE__*/React.createElement("option", null, "France")))), /*#__PURE__*/React.createElement(Col, {
      sm: "12"
    }, /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "languages"
    }, "Favourite Languages"), /*#__PURE__*/React.createElement(Select, {
      isMulti: true,
      defaultValue: [languages[0], languages[1]],
      isClearable: true,
      styles: colourStyles,
      options: languages,
      className: "React",
      classNamePrefix: "select",
      id: "languages"
    }))), /*#__PURE__*/React.createElement(Col, {
      sm: "12"
    }, /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "number"
    }, "Phone Number"), /*#__PURE__*/React.createElement(Input, {
      type: "number",
      name: "number",
      id: "number",
      placeholder: "Phone Number"
    }))), /*#__PURE__*/React.createElement(Col, {
      sm: "12"
    }, /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "url"
    }, "Website URL"), /*#__PURE__*/React.createElement(Input, {
      type: "url",
      name: "url",
      id: "url",
      placeholder: "Website URL"
    }))), /*#__PURE__*/React.createElement(Col, {
      sm: "12"
    }, /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement("div", {
      className: "d-inline-block mr-1"
    }, /*#__PURE__*/React.createElement(Radio, {
      label: "Male",
      defaultChecked: true,
      name: "gender"
    })), /*#__PURE__*/React.createElement("div", {
      className: "d-inline-block mr-1"
    }, /*#__PURE__*/React.createElement(Radio, {
      label: "Female",
      defaultChecked: false,
      name: "gender"
    })), /*#__PURE__*/React.createElement("div", {
      className: "d-inline-block"
    }, /*#__PURE__*/React.createElement(Radio, {
      label: "Other",
      defaultChecked: false,
      name: "gender"
    })))), /*#__PURE__*/React.createElement(Col, {
      className: "d-flex justify-content-start flex-wrap",
      sm: "12"
    }, /*#__PURE__*/React.createElement(Button.Ripple, {
      className: "mr-50",
      type: "submit",
      color: "primary"
    }, "Save Changes"), /*#__PURE__*/React.createElement(Button.Ripple, {
      type: "submit",
      color: "danger"
    }, "Cancel")))));
  }

}

class SocialLinks extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Form, {
      onSubmit: e => e.preventDefault()
    }, /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
      sm: "12"
    }, /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "twitter"
    }, "Twitter"), /*#__PURE__*/React.createElement(Input, {
      id: "twitter",
      defaultValue: "https://www.twitter.com"
    }))), /*#__PURE__*/React.createElement(Col, {
      sm: "12"
    }, /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "facebook"
    }, "Facebook"), /*#__PURE__*/React.createElement(Input, {
      id: "facebook",
      placeholder: "Add Link"
    }))), /*#__PURE__*/React.createElement(Col, {
      sm: "12"
    }, /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "google"
    }, "Google+"), /*#__PURE__*/React.createElement(Input, {
      id: "google",
      placeholder: "Add Link"
    }))), /*#__PURE__*/React.createElement(Col, {
      sm: "12"
    }, /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "linkedin"
    }, "Linkedin"), /*#__PURE__*/React.createElement(Input, {
      id: "linkedin",
      defaultValue: "https://www.linkedin.com"
    }))), /*#__PURE__*/React.createElement(Col, {
      sm: "12"
    }, /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "instagram"
    }, "Instagram"), /*#__PURE__*/React.createElement(Input, {
      id: "instagram",
      placeholder: "Add Link"
    }))), /*#__PURE__*/React.createElement(Col, {
      sm: "12"
    }, /*#__PURE__*/React.createElement(FormGroup, null, /*#__PURE__*/React.createElement(Label, {
      for: "quora"
    }, "Quora"), /*#__PURE__*/React.createElement(Input, {
      id: "quora",
      placeholder: "Add Link"
    }))), /*#__PURE__*/React.createElement(Col, {
      className: "d-flex justify-content-start flex-wrap",
      sm: "12"
    }, /*#__PURE__*/React.createElement(Button.Ripple, {
      className: "mr-50",
      type: "submit",
      color: "primary"
    }, "Save Changes"), /*#__PURE__*/React.createElement(Button.Ripple, {
      type: "submit",
      color: "danger"
    }, "Cancel")))));
  }

}

class Connection extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
      sm: "12"
    }, /*#__PURE__*/React.createElement("div", {
      className: "d-flex flex-wrap justify-content-between align-items-center mb-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "social-media"
    }, /*#__PURE__*/React.createElement("p", {
      className: "mb-0"
    }, "Account is connected with Google."), /*#__PURE__*/React.createElement("p", {
      className: "text-bold-500"
    }, "john@gmail.com")), /*#__PURE__*/React.createElement("div", {
      className: "disconnect"
    }, /*#__PURE__*/React.createElement(Button.Ripple, {
      color: "danger",
      outline: true
    }, "Disconnect")))), /*#__PURE__*/React.createElement(Col, {
      sm: "12"
    }, /*#__PURE__*/React.createElement("div", {
      className: "d-flex flex-wrap justify-content-between align-items-center mb-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "social-media"
    }, /*#__PURE__*/React.createElement("p", {
      className: "mb-0"
    }, "Account is connected with Facebook."), /*#__PURE__*/React.createElement("p", {
      className: "text-bold-500"
    }, "@pixinvents")), /*#__PURE__*/React.createElement("div", {
      className: "disconnect"
    }, /*#__PURE__*/React.createElement(Button.Ripple, {
      color: "danger",
      outline: true
    }, "Disconnect")))), /*#__PURE__*/React.createElement(Col, {
      sm: "12"
    }, /*#__PURE__*/React.createElement(Button.Ripple, {
      color: "info"
    }, "Connect to Twitter")), /*#__PURE__*/React.createElement(Col, {
      sm: "12"
    }, /*#__PURE__*/React.createElement(Button.Ripple, {
      className: "mt-2",
      color: "primary"
    }, "Connect to Instagram"))));
  }

}

class Notification extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
      sm: "12"
    }, /*#__PURE__*/React.createElement("h6", {
      className: "mb-1"
    }, "Activity"), /*#__PURE__*/React.createElement(CustomInput, {
      type: "switch",
      className: "d-block mb-2",
      id: "article",
      name: "article",
      inline: true
    }, /*#__PURE__*/React.createElement("span", {
      className: "mb-0 ml-sm-0 switch-label"
    }, "Email me when someone comments on my article")), /*#__PURE__*/React.createElement(CustomInput, {
      type: "switch",
      className: "d-block mb-2",
      id: "form",
      name: "form",
      inline: true
    }, /*#__PURE__*/React.createElement("span", {
      className: "mb-0 switch-label"
    }, "Email me when someone answers on my form")), /*#__PURE__*/React.createElement(CustomInput, {
      type: "switch",
      className: "d-block mb-2",
      id: "follow",
      name: "follow",
      inline: true
    }, /*#__PURE__*/React.createElement("span", {
      className: "mb-0 switch-label"
    }, "Email me when someone follows me"))), /*#__PURE__*/React.createElement(Col, {
      className: "mt-1",
      sm: "12"
    }, /*#__PURE__*/React.createElement("h6", {
      className: "mb-1"
    }, "Application"), /*#__PURE__*/React.createElement(CustomInput, {
      type: "switch",
      className: "d-block mb-2",
      id: "news",
      name: "news",
      inline: true
    }, /*#__PURE__*/React.createElement("span", {
      className: "mb-0 switch-label"
    }, "News and announcements")), /*#__PURE__*/React.createElement(CustomInput, {
      type: "switch",
      className: "d-block mb-2",
      id: "update",
      name: "update",
      inline: true
    }, /*#__PURE__*/React.createElement("span", {
      className: "mb-0 switch-label"
    }, "Weekly product updates")), /*#__PURE__*/React.createElement(CustomInput, {
      type: "switch",
      className: "d-block mb-2",
      id: "blog",
      name: "blog",
      inline: true
    }, /*#__PURE__*/React.createElement("span", {
      className: "mb-0 switch-label"
    }, "Weekly blog digest"))), /*#__PURE__*/React.createElement(Col, {
      sm: "12"
    }, /*#__PURE__*/React.createElement(Button.Ripple, {
      className: "mr-1",
      color: "primary"
    }, "Save Changes"), /*#__PURE__*/React.createElement(Button.Ripple, {
      color: "danger",
      outline: true
    }, "Cancel"))));
  }

}

class BreadCrumbs extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "content-header row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "content-header-left col-md-9 col-12 mb-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row breadcrumbs-top"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-12"
    }, this.props.breadCrumbTitle ? /*#__PURE__*/React.createElement("h2", {
      className: "content-header-title float-left mb-0"
    }, this.props.breadCrumbTitle) : '', /*#__PURE__*/React.createElement("div", {
      className: "breadcrumb-wrapper vx-breadcrumbs d-sm-block d-none col-12"
    }, /*#__PURE__*/React.createElement(Breadcrumb, {
      tag: "ol"
    }, /*#__PURE__*/React.createElement(BreadcrumbItem, {
      tag: "li"
    }, /*#__PURE__*/React.createElement(NavLink$1, {
      to: "/"
    }, /*#__PURE__*/React.createElement(Home, {
      className: "align-top",
      size: 15
    }))), this.props.breadCrumbParent ? /*#__PURE__*/React.createElement(BreadcrumbItem, {
      tag: "li",
      className: "text-primary"
    }, this.props.breadCrumbParent2) : '', this.props.breadCrumbParent2 ? /*#__PURE__*/React.createElement(BreadcrumbItem, {
      tag: "li",
      className: "text-primary"
    }, this.props.breadCrumbParent2) : '', this.props.breadCrumbParent3 ? /*#__PURE__*/React.createElement(BreadcrumbItem, {
      tag: "li",
      className: "text-primary"
    }, this.props.breadCrumbParent3) : '', /*#__PURE__*/React.createElement(BreadcrumbItem, {
      tag: "li",
      active: true
    }, this.props.breadCrumbActive)))))));
  }

}

class AccountSettings extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      activeTab: '1',
      windowWidth: null
    };

    this.toggle = tab => {
      this.setState({
        activeTab: tab
      });
    };

    this.updateWidth = () => {
      this.setState({
        windowWidth: window.innerWidth
      });
    };
  }

  componentDidMount() {
    if (window !== undefined) {
      this.updateWidth();
      window.addEventListener('resize', this.updateWidth);
    }
  }

  render() {
    let {
      windowWidth
    } = this.state;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BreadCrumbs, {
      breadCrumbTitle: "Account Settings",
      breadCrumbActive: "Account Settings"
    }), /*#__PURE__*/React.createElement("div", {
      className: `${windowWidth >= 769 ? 'nav-vertical' : 'account-setting-wrapper'}`
    }, /*#__PURE__*/React.createElement(Nav, {
      className: "account-settings-tab nav-left mr-0 mr-sm-3",
      tabs: true
    }, /*#__PURE__*/React.createElement(NavItem, null, /*#__PURE__*/React.createElement(NavLink, {
      className: classnames({
        active: this.state.activeTab === '1'
      }),
      onClick: () => {
        this.toggle('1');
      }
    }, /*#__PURE__*/React.createElement(Settings, {
      size: 16
    }), /*#__PURE__*/React.createElement("span", {
      className: "d-md-inline-block d-none align-middle ml-1"
    }, "General"))), /*#__PURE__*/React.createElement(NavItem, null, /*#__PURE__*/React.createElement(NavLink, {
      className: classnames({
        active: this.state.activeTab === '2'
      }),
      onClick: () => {
        this.toggle('2');
      }
    }, /*#__PURE__*/React.createElement(Lock, {
      size: 16
    }), /*#__PURE__*/React.createElement("span", {
      className: "d-md-inline-block d-none align-middle ml-1"
    }, "Change Password"))), /*#__PURE__*/React.createElement(NavItem, null, /*#__PURE__*/React.createElement(NavLink, {
      className: classnames({
        active: this.state.activeTab === '3'
      }),
      onClick: () => {
        this.toggle('3');
      }
    }, /*#__PURE__*/React.createElement(Info, {
      size: 16
    }), /*#__PURE__*/React.createElement("span", {
      className: "d-md-inline-block d-none align-middle ml-1"
    }, "Info"))), /*#__PURE__*/React.createElement(NavItem, null, /*#__PURE__*/React.createElement(NavLink, {
      className: classnames({
        active: this.state.activeTab === '4'
      }),
      onClick: () => {
        this.toggle('4');
      }
    }, /*#__PURE__*/React.createElement(Instagram, {
      size: 16
    }), /*#__PURE__*/React.createElement("span", {
      className: "d-md-inline-block d-none align-middle ml-1"
    }, "Social Links"))), /*#__PURE__*/React.createElement(NavItem, null, /*#__PURE__*/React.createElement(NavLink, {
      className: classnames({
        active: this.state.activeTab === '5'
      }),
      onClick: () => {
        this.toggle('5');
      }
    }, /*#__PURE__*/React.createElement(Link$1, {
      size: 16
    }), /*#__PURE__*/React.createElement("span", {
      className: "d-md-inline-block d-none align-middle ml-1"
    }, "Connections"))), /*#__PURE__*/React.createElement(NavItem, null, /*#__PURE__*/React.createElement(NavLink, {
      className: classnames({
        active: this.state.activeTab === '6'
      }),
      onClick: () => {
        this.toggle('6');
      }
    }, /*#__PURE__*/React.createElement(Bell, {
      size: 16
    }), /*#__PURE__*/React.createElement("span", {
      className: "d-md-inline-block d-none align-middle ml-1"
    }, "Notifications")))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardBody, null, /*#__PURE__*/React.createElement(TabContent, {
      activeTab: this.state.activeTab
    }, /*#__PURE__*/React.createElement(TabPane, {
      tabId: "1"
    }, /*#__PURE__*/React.createElement(General, null)), /*#__PURE__*/React.createElement(TabPane, {
      tabId: "2"
    }, /*#__PURE__*/React.createElement(ChangePassword, null)), /*#__PURE__*/React.createElement(TabPane, {
      tabId: "3"
    }, /*#__PURE__*/React.createElement(InfoTab, null)), /*#__PURE__*/React.createElement(TabPane, {
      tabId: "4"
    }, /*#__PURE__*/React.createElement(SocialLinks, null)), /*#__PURE__*/React.createElement(TabPane, {
      tabId: "5"
    }, /*#__PURE__*/React.createElement(Connection, null)), /*#__PURE__*/React.createElement(TabPane, {
      tabId: "6"
    }, /*#__PURE__*/React.createElement(Notification, null)))))));
  }

}

const AppRouter = props => {
  const {
    checkLoginStatus,
    appId,
    isAuthentication,
    loginAction,
    authToken,
    children,
    loadNavtigation,
    message
  } = props;
  useEffect(() => {
    loadNavtigation(appId);
    const code = new URLSearchParams(document.location.search).get('code');
    checkLoginStatus(code || authToken);
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
  return /*#__PURE__*/React.createElement(IntlProviderWrapper, {
    appMessage: appMessage
  }, /*#__PURE__*/React.createElement(Router, {
    history: history
  }, /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(Route, {
    path: "/",
    render: props => isAuthentication ? /*#__PURE__*/React.createElement(Layout$1, props, /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(Route, {
      path: "/account-settings",
      component: AccountSettings
    }), /*#__PURE__*/React.createElement(Route, {
      path: "/",
      render: () => children
    }))) : /*#__PURE__*/React.createElement(FullPageLayout, null, /*#__PURE__*/React.createElement(Login, {
      loginAction: loginAction
    }))
  }))));
};

const mapStateToProps$3 = state => {
  return {
    isAuthentication: !!state.auth.username,
    authToken: state.auth.authToken
  };
};

var AppRouter$1 = connect(mapStateToProps$3, {
  checkLoginStatus,
  loginAction,
  loadNavtigation
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

const DatePicker = props => /*#__PURE__*/React.createElement(Flatpickr, props);

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

export { AppId, Autocomplete as AutoComplete, App as BaseApp, DatePicker, FallbackSpinner, HttpClient, Radio, useDeviceDetect, useWindowDimensions };
//# sourceMappingURL=index.modern.js.map
