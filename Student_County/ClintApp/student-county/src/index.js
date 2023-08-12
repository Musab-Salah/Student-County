import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UniversitiesProvider } from "./handlers/UniversityHandlers";
import { CollegesProvider } from "./handlers/CollegeHandlers";
import { BooksProvider } from "./handlers/BooksHandlers";
import { AuthProvider } from "./handlers/AuthHandlers";
import { ComponentProvider } from "./handlers/ComponentHandlers";
import { HousingsProvider } from "./handlers/HousingHandlers";
import { RidesProvider } from "./handlers/RideHandlers";
import { LocationProvider } from "./handlers/LocationHandlers";
import { PatientsProvider } from "./handlers/PatientHandlers";
import { ToolsProvider } from "./handlers/ToolsHandlers";
import AuthVerify from "./certificates/AuthVerify";
import "./Global.css";
import { LoaderProvider } from "./handlers/LoaderHandlers";
import { ChatsProvider } from "./handlers/ChatHandlers";
import { UserRelationDatasProvider } from "./handlers/UserRelationDataHandlers";


let docTitle = document.title;
window.addEventListener("blur", () => {
  document.title = "Come Back :(";
});

window.addEventListener("focus", () => {
  document.title = docTitle;
});


/// add Suspense fallback
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ComponentProvider>
      <AuthProvider>
        <AuthVerify />
        <UniversitiesProvider>
          <CollegesProvider>
            <ChatsProvider>
              <ToolsProvider>
                <PatientsProvider>
                  <LocationProvider>
                    <RidesProvider>
                      <HousingsProvider>
                        <BooksProvider>
                          <LoaderProvider>
                            <UserRelationDatasProvider>
                              <Routes>
                                <Route path="/*" element={<App />} />
                              </Routes>
                            </UserRelationDatasProvider>
                          </LoaderProvider>
                        </BooksProvider>
                      </HousingsProvider>
                    </RidesProvider>
                  </LocationProvider>
                </PatientsProvider>
              </ToolsProvider>
            </ChatsProvider>
          </CollegesProvider>
        </UniversitiesProvider>
      </AuthProvider>
    </ComponentProvider>
  </BrowserRouter>
);


