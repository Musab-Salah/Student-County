import React, { Suspense } from "react";
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
import { DestinationsProvider } from "./handlers/DestinationHandlers";
import { PatientsProvider } from "./handlers/PatientHandlers";
import { ToolsProvider } from "./handlers/ToolsHandlers";
import AuthVerify from "./certificates/AuthVerify";
import "./Global.css";
import { LoaderProvider } from "./handlers/LoaderHandlers";
import { ChatsProvider } from "./handlers/ChatHandlers";

let docTitle = document.title;
window.addEventListener("blur", () => {
  document.title = "Come Back :(";
});

window.addEventListener("focus", () => {
  document.title = docTitle;
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ComponentProvider>
      <ChatsProvider>
        <AuthProvider>
          <AuthVerify />
          <UniversitiesProvider>
            <CollegesProvider>
              <ToolsProvider>
                <PatientsProvider>
                  <DestinationsProvider>
                    <RidesProvider>
                      <HousingsProvider>
                        <BooksProvider>
                          <LoaderProvider>
                            <Suspense fallback={<div>lod</div>}>
                              <Routes>
                                <Route path="/*" element={<App />} />
                              </Routes>
                            </Suspense>
                          </LoaderProvider>
                        </BooksProvider>
                      </HousingsProvider>
                    </RidesProvider>
                  </DestinationsProvider>
                </PatientsProvider>
              </ToolsProvider>
            </CollegesProvider>
          </UniversitiesProvider>
        </AuthProvider>
      </ChatsProvider>
    </ComponentProvider>
  </BrowserRouter>
);
