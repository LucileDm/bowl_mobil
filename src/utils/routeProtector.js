import { useEffect, useState, useContext } from "react";
import { /*Navigate,*/ Outlet, useNavigation } from '@react-navigation/native';
import { errorHandler } from './errorHandler';
import { AuthContext } from "../contexts/AuthContext";
import jwt_decode from "jwt-decode";

const routeProtector = ({permittedRoles, children}) => {
    const [isAllowed, setIsAllowed] = useState(false),
    [checked, setChecked] = useState(false),
    navigate = useNavigation();
    
    const { user } = useContext(AuthContext);
    
    if (permittedRoles === undefined) {
        permittedRoles = [];
    }
    
    useEffect(() => {
        try {
            let userInfos;
            const currentToken = user?.data?.token
            if (currentToken) {
                userInfos = jwt_decode(currentToken);
                // user only needs to be connected 
                // OR need to be connected and have those roles 
                if ((permittedRoles.length === 0) || (permittedRoles.includes(userInfos?.roleID))) {
                    setIsAllowed(true)
                }
            }
        } catch (err) {
            errorHandler('REDIRECT', err, navigate)
        } finally {
            setChecked(true)
        }
    }, [user, navigate, permittedRoles])

    const RenderPage = ({children, permittedRoles}) => {
        if (isAllowed) {
            return (children) ? children : <Outlet />
        } else {
            return (permittedRoles.length === 0) // means the user only needed to be connected.
            ? navigate.replace('Login') // location ?
            : navigate.replace(
                'Erreur',
				{
                    screen: 'Error',
					params: { code: 'Forbidden', message: "Vous n'êtes pas autorisé à accéder à cette page." }
				}
            )
        }
    }

    return (checked) ? <RenderPage children={children} permittedRoles={permittedRoles} /> : '';
}

export default routeProtector;