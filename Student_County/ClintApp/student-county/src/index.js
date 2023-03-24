import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./assets/Global.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UniversitiesProvider } from "./context/UniversityCommon";
import { CollegesProvider } from "./context/CollegeCommon";
import { BooksProvider } from "./context/BookStoreCommon";
import { AuthProvider } from "./context/AuthCommon";
import { HousingsProvider } from "./context/HousingCommon";
import { RidesProvider } from "./context/RideCommon";
import { DestinationsProvider } from "./context/DestinationCommon";
import AuthVerify from "./utils/AuthVerify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UniversitiesProvider>
        <AuthProvider>
          <CollegesProvider>
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
          </CollegesProvider>
          <AuthVerify />
        </AuthProvider>
      </UniversitiesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
