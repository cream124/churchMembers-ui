
const menuListSuperUser0 = [
  {
    name: "Servicios",
    uri: "/",
    key: "51",
    icon: "<InboxIcon />"
  },
  {
    name: "Reportes",
    uri: "/addPerson",
    key: "61",
    icon: "<InboxIcon />",
    isNemu: true,
    options: [
      {
        name: 'Lista de Hermano',
        uri: '/personprint',
      },

      {
        name: 'Buscar Hermanos',
        uri: '/search',
      },
    ]
  },
  {
    name: "Registros",
    uri: "/addPerson",
    key: "62",
    icon: "<InboxIcon />",
    isNemu: true,
    options: [
      {
        name: 'Nuevo Hermano',
        uri: '/addPerson3',
      },
      {
        name: 'Editar Hermano',
        uri: '/brother',
      },
      {
        name: 'Editar Mis Registros',
        uri: '/records',
      },
      {
        name: 'Aprobación de Hermano',
        uri: '/active',
      },
    ]
  },
  {
    name: "Registros2",
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
      {
        name: 'Nuevo Registro2',
        uri: '/addPerson2',
      },
      {
        name: 'Nuevo Registro3',
        uri: '/addPerson3',
      },
      {
        name: 'Imprimir Hermano',
        uri: '/printPerson',
      },
      {
        name: 'Modificar Hermano',
        uri: '/updatePerson',
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

const menuListSuperUser = [
  {
    name: "Lista de Hermanos",
    uri: "personprint",
    key: "1",
    icon: "<MailIcon />"
  },
  {
    name: "Buscar Hermanos",
    uri: "search",
    key: "2",
    icon: "<MailIcon />"
  },
  // {
  //   name: "Reportes",
  //   uri: "/addPerson",
  //   key: "61",
  //   icon: "<InboxIcon />",
  //   isNemu: true,
  //   options: [
  //     {
  //       name: 'Lista de Hermanos',
  //       uri: '/personprint',
  //     },
  //     {
  //       name: 'Buscar Hermanos',
  //       uri: '/search',
  //     },
  //   ]
  // },
  {
    name: "Registros",
    uri: "/addPerson",
    key: "62",
    icon: "<InboxIcon />",
    isNemu: true,
    options: [
      {
        name: 'Nuevo Hermano',
        uri: '/addPerson3',
      },
      {
        name: 'Editar Hermano',
        uri: '/brother',
      },
      {
        name: 'Editar Mis Registros',
        uri: '/records',
      },
      // {
      //   name: 'Aprobación de Hermano',
      //   uri: '/active',
      // },
    ]
  },
  {
    name: "Activación de Hermano",
    uri: "/active",
    key: "3",
    icon: "<MailIcon />"
  },
  // {
  //   name: "Nosotros",
  //   uri: "mission",
  //   key: "8",
  //   icon: "<MailIcon />",
  //   isNemu: true,
  //   options: [
  //     {
  //       name: 'Mision y Vision',
  //       uri: '/mission',
  //     },
  //     {
  //       name: 'Versiculo del dia',
  //       uri: '/verse',
  //     },
  //   ]
  // },
  // {
  //   name: "Contactos",
  //   uri: "contact",
  //   key: "10",
  //   icon: "<MailIcon />"
  // }
];

const menuListUser = [
  {
    name: "Lista de Hermanos",
    uri: "personprint",
    key: "1",
    icon: "<MailIcon />"
  },
  {
    name: "Buscar Hermanos",
    uri: "search",
    key: "2",
    icon: "<MailIcon />"
  },
  {
    name: "Registros",
    uri: "/addPerson",
    key: "62",
    icon: "<InboxIcon />",
    isNemu: true,
    options: [
      {
        name: 'Nuevo Hermano',
        uri: '/addPerson3',
      },
      {
        name: 'Editar Hermano',
        uri: '/brother',
      },
      {
        name: 'Editar Mis Registros',
        uri: '/records',
      }
    ]
  }
];

const menuListGuest = [
  {
    name: "Lista de Hermanos",
    uri: "personprint",
    key: "1",
    icon: "<MailIcon />"
  },
  {
    name: "Buscar Hermanos",
    uri: "search",
    key: "2",
    icon: "<MailIcon />"
  },
  {
    name: "Registros",
    uri: "/addPerson",
    key: "62",
    icon: "<InboxIcon />",
    isNemu: true,
    options: [
      {
        name: 'Nuevo Hermano',
        uri: '/addPerson3',
      },
      // {
      //   name: 'Editar Hermano',
      //   uri: '/brother',
      // },
      {
        name: 'Editar Mis Registros',
        uri: '/records',
      }
    ]
  }
];

const menuListAll = [
  {
    name: "Servicios",
    uri: "/",
    key: "51",
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
  }
  if (level > 200) {
    return [
      ...menuListUser,
    ];
  }
  if (level > 100) {
    return [
      ...menuListGuest,
      // ...menuListAll,
    ];
  }
  return [
    ...menuListAll,
  ];
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
