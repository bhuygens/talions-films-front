import React, {PropsWithChildren} from "react";

type LayoutProps = {

}

function Layout({children}: LayoutProps & PropsWithChildren) {
  return (
    <>
      <div className={"flex flex-row  justify-between p-4"}>
        <div className={"flex flex-row"}>
          <p>Précédent</p>
        </div>
        <div>
          Suivant
        </div>
      </div>
      {children}
    </>
  );
}

export default Layout;
