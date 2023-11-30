import type { TypeAlerts } from "~/types/common"
import type { TypeRoles } from "~/types/users"

export const CONTENT = {
  faq: [
    {
      id: 0,
      question: 'What do you want to',
      answer: 'What do you want to do',
    },
    {
      id: 1,
      question: 'What do you want to 1',
      answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima. Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima. Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima. Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima. Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima',
    },
    {
      id: 2,
      question: 'What do you want to 2',
      answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima. Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima. Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima. Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima. Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima',
    },
    {
      id: 3,
      question: 'What do you want to',
      answer: 'What do you want to do',
    },
    {
      id: 4,
      question: 'What do you want to',
      answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima. Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima. Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima. Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima. Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima',
    },
    {
      id: 5,
      question: 'What do you want to',
      answer: 'What do you want to do',
    },
    {
      id: 6,
      question: 'What do you want to',
      answer: 'What do you want to do',
    },
  ],
  links: [
    {
      to: '/user',
      text: 'pages.user',
      icon: 'cart-plus',
    },
    {
      to: '/user/product-list',
      text: 'pages.productList',
      icon: 'format-list-bulleted',
    },
    {
      to: '/user/info',
      text: 'pages.info',
      icon: 'information-variant-circle-outline',
    },
    {
      to: '/user/calculation',
      text: 'pages.calculation',
      icon: 'calculator-variant-outline',
    },
  ],
  places: [
    {
      id: 0,
      type: 'china',
      icon: 'earth',
    },
    {
      id: 1,
      type: 'border',
      icon: '',
      iconPath: 'kz-border'
    },
    {
      id: 3,
      type: 'branch',
      icon: 'home-account',
    }
  ],
}

export const ALERTS: { [key in TypeAlerts]: TypeAlerts } = {
  error: 'error',
  success: 'success',
  warning: 'warning',
  info: 'info',
}

export const ROLES: { [key in TypeRoles]: TypeRoles } = {
  ROLE_USER: 'ROLE_USER',
  ROLE_MANAGER: 'ROLE_MANAGER',
  ROLE_ADMIN: 'ROLE_ADMIN',
}

export const ADMIN_MENUS = [
  {
    to: '/admin/locations',
    text: 'pages.locations',
    roles: [ROLES.ROLE_ADMIN]
  },
  {
    to: '/admin/branchs',
    text: 'pages.branchs',
    roles: [ROLES.ROLE_ADMIN]
  },
  {
    to: '/admin/personals',
    text: 'pages.personals',
    roles: [ROLES.ROLE_ADMIN]
  },
  {
    to: '/admin/products',
    text: 'pages.products',
    roles: [ROLES.ROLE_ADMIN, ROLES.ROLE_MANAGER]
  },
  {
    to: '/admin/users',
    text: 'pages.users',
    roles: [ROLES.ROLE_ADMIN, ROLES.ROLE_MANAGER]
  },
  {
    to: '/admin/checkProduct',
    text: 'pages.checkProduct',
    roles: [ROLES.ROLE_ADMIN, ROLES.ROLE_MANAGER]
  },
]