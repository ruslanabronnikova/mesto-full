import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ element: Element, isLoggedIn, ...props }) {
  if (!isLoggedIn) {
    // Если пользователь не залогинен, можно перенаправить его на страницу входа или другую подходящую страницу
    return <Navigate to="/" replace />;
  }

  // Если пользователь залогинен, передаем элемент для рендеринга
  return <Element {...props} />;
}

export default ProtectedRoute;
