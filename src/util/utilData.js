
import userRol from "../component/data/userRol.json";

export function getUserRolName(userRolValue) {
    return userRol[userRolValue];
}
export function getPersonStatenName(state) {
    const states = getPersonState();
    return states[state].name;
}
export function getPersonState() {
    const states = {
        registered: {
            name: "Registrado",
            actions:
                [{ name: "Activar", action: "active" }, { name: "Denegar Registro", action: "registeredCancel" }]
        },
        active: {
            name: "Activo",
            actions:
                [{ name: "Inactivar", action: "inactive" }, { name: "Eliminar", action: "deleted" }]
        },
        inactive: {
            name: "Inactivo",
            actions:
                [{ name: "Activar", action: "active" }, { name: "Eliminar", action: "deleted" }]
        },
        deleted: {
            name: "Eliminado",
            actions:
                [{ name: "Activar", action: "active" }, { name: "Eliminar", action: "deleted" }]
        },
        registeredCancel: {
            name: "Registro Denegado",
            actions:
                [{ name: "Activar", action: "active" }, { name: "Eliminar", action: "deleted" }]
        },
    }
    return states;
}
