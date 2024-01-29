
const menuListSuperUser = [
  {
    name: "Servicios",
    uri: "/",
    key: "51",
    icon: "<InboxIcon />"
  },
  {
    name: "Registros",
    uri: "/addPerson",
    key: "6",
    icon: "<InboxIcon />",
    isNemu: true,
      options: [
        {
          name: 'Aprobación de Registros',
          uri: '/registrationRequest',
        },
        {
          name: 'Registrados',
          uri: '/records',
        },
        {
          name: 'Editar Servicios y Eventos',
          uri: '/event',
        },
        {
          name: 'Nuevo Registro',
          uri: '/addPerson',
        },
      ]
  },
  {
    name: "Nosotros",
    uri: "mission",
    key: "8",
    icon: "<MailIcon />",
    isNemu: true,
      options: [
        {
          name: 'Mision y Vision',
          uri: '/mission',
        },
        {
          name: 'Versiculo del dia',
          uri: '/verse',
        },
      ]
  }
  ,
  // {
  //   name: "Como llegar",
  //   uri: "",
  //   key: "9",
  //   icon: "<MailIcon />"
  // }
  // ,
  {
    name: "Contactos",
    uri: "contact",
    key: "10",
    icon: "<MailIcon />"
  }

];
const menuListUser = [
  // {
  //   name: "Solicitud De Registro",
  //   uri: "registrationRequest",
  //   key: "3",
  //   icon: "<InboxIcon />"
  // },
  // {
  //   name: "Ver Registros",
  //   uri: "records",
  //   key: "4",
  //   icon: "<MailIcon />"
  // }
];

const menuListAll = [
  {
    name: "Servicios",
    uri: "/",
    key: "51",
    icon: "<InboxIcon />"
  },
  {
    name: "Nuevo Registro",
    uri: "/addPerson",
    key: "6",
    icon: "<InboxIcon />"
  },
  {
    name: "Nosotros",
    uri: "mission",
    key: "8",
    icon: "<MailIcon />",
    isNemu: true,
      options: [
        {
          name: 'Mision y Vision',
          uri: '/mission',
        },
        {
          name: 'Versiculo del dia',
          uri: '/verse',
        },
      ]
  }
  ,
  // {
  //   name: "Como llegar",
  //   uri: "",
  //   key: "9",
  //   icon: "<MailIcon />"
  // }
  // ,
  {
    name: "Contactos",
    uri: "contact",
    key: "10",
    icon: "<MailIcon />"
  }

];
function getItems(level) {
  if (level > 500) {
    return [
      ...menuListSuperUser,
    ];
  } else {
    if (level > 100) {
    return [
      ...menuListUser,
      ...menuListAll,
    ];
    } else {
      return [...menuListAll];
    } 
  }
}

function getItems2() {
  return [
    { name: 'Configuraciones', uri: '/' },
    {
      name: 'Pasajes',
      uri: '/sale',
      isNemu: true,
      options: [
        {
          name: 'ventas',
          uri: '/',
        },
        {
          name: 'Sale',
          uri: '/sale',
        },
        {
          name: 'Ministerios',
          uri: '/',
        },

      ]
    },
    {
      name: 'Encomiendas',
      uri: '/reception',
      isNemu: true,
      options: [
        {
          name: 'Recepcion',
          uri: '/reception',
        },
        {
          name: 'Entrega',
          uri: '/',
        },
        {
          name: 'Envarque',
          uri: '/',
        },
        {
          name: 'Desembarque',
          uri: '/',
        },
      ]
    },
    { name: 'Logisticos', uri: '/verse' },
    { name: 'Contact', uri: '/event' }];
}

export function getMenuItems(lavel) {
  return getItems(lavel);
};
