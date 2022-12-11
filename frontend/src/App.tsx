import { ColorScheme, MantineProvider } from "@mantine/core"
import { useLocalStorage } from "@mantine/hooks"
import AppShell from "./components/Layout/AppShell"
import NotFound from "./components/Elements/NotFound/NotFound"
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom"
import TableExample from './components/Elements/Table/Table';
import User from "./components/Elements/User/User"

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    defaultValue: "light"
  })

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS
      theme={{
        fontFamily: 'Open Sans, sans serif',
        spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
        colorScheme: colorScheme,
      }}
    >
      <Router>
        <Routes>
          {/* Routes with AppShellExmaple layout */}
          <Route element={<AppShell ><Outlet /></AppShell>}>
            <Route path="/" element={<TableExample />} />
            <Route path="/user" element={< User />} />
            <Route />
          </Route>

          {/* 404 not found route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </MantineProvider>
  )
}

export default App
