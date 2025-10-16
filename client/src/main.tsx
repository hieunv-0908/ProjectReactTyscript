import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import router from './router.tsx'
import { RouterProvider } from 'react-router-dom'
import '@ant-design/v5-patch-for-react-19';
import { Provider } from 'react-redux';
import { store } from '../redux/store/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
