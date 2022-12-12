import { ColorScheme, createStyles, MantineProvider } from "@mantine/core"
import { useLocalStorage } from "@mantine/hooks"
import AppShell from "./components/Layout/AppShell"
import NotFound from "./components/Elements/NotFound/NotFound"
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom"
import User from "./components/Elements/User/User"
import Home from "./components/Home/Home"

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    defaultValue: "light"
  });

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS
      theme={{
        fontFamily: 'Montserrat, sans- serif ',
        spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
      }}
    >
      <Router>
        <Routes>
          {/* Routes with AppShellExmaple layout */}
          <Route element={<AppShell ><Outlet /></AppShell>}>
            <Route path="/" element={<Home />} />
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
