import { createBrowserRouter, RouterProvider } from 'react-router';
import TodoList from './pages/TodoList';

import { Provider } from 'react-redux';
import {store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';


// Konfigurasi Peta Rute URL halaman
const router = createBrowserRouter([

  {
    path: "/",
    element: <TodoList />,
  }
])

function App() {
  // Jalankan konfigurasi router ke dalam aplikasi React
  return (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
  )
}

export default App;