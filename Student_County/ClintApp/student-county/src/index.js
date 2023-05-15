import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UniversitiesProvider } from "./context/UniversityCommon";
import { CollegesProvider } from "./context/CollegeCommon";
import { BooksProvider } from "./context/BookStoreCommon";
import { AuthProvider } from "./context/AuthCommon";
import { ComponentProvider } from "./context/ComponentCommon";
import { HousingsProvider } from "./context/HousingCommon";
import { RidesProvider } from "./context/RideCommon";
import { DestinationsProvider } from "./context/DestinationCommon";
import { PatientsProvider } from "./context/PatientCommon";
import { ToolsProvider } from "./context/ToolsCommon";
import AuthVerify from "./utils/AuthVerify";
import "./Global.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UniversitiesProvider>
      <CollegesProvider>
        <ComponentProvider>
          <AuthProvider>
            <AuthVerify />
            <ToolsProvider>
              <PatientsProvider>
                <DestinationsProvider>
                  <RidesProvider>
                    <HousingsProvider>
                      <BooksProvider>
                        <Suspense fallback={<div>lod</div>}>
                          <Routes>
                            <Route path="/*" element={<App />} />
                          </Routes>
                        </Suspense>
                      </BooksProvider>
                    </HousingsProvider>
                  </RidesProvider>
                </DestinationsProvider>
              </PatientsProvider>
            </ToolsProvider>
          </AuthProvider>
        </ComponentProvider>
      </CollegesProvider>
    </UniversitiesProvider>
  </BrowserRouter>
);
