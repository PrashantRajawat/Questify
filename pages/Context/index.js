import {createContext} from "react";
const AppContext=createContext();
 const AppProvider=({children})=>{
   
    if (typeof window !== 'undefined') {
        // Perform localStorage action
     const token=localStorage.getItem("cookieFallback");  
    return<AppContext.Provider value={token}>{children}</AppContext.Provider>
    }
}
export default AppProvider;
export {AppContext};