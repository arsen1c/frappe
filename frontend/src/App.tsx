import { ColorScheme, ColorSchemeProvider, createStyles, MantineProvider } from "@mantine/core"
import { useLocalStorage } from "@mantine/hooks"
import AppShell from "./components/Layout/AppShell"
import NotFound from "./components/Elements/NotFound/NotFound"
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom"
import Member from "./components/Elements/Member/Member"
import Home from "./components/Home/Home"
import { useState } from "react"
import { useTheme } from "@emotion/react"
import Books from "./components/Books/Books"

function App() {
  // const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
  //   key: "color-scheme",
  //   defaultValue: "light"
  // });
  const theme = useTheme();

  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider withGlobalStyles withNormalizeCSS
        theme={{
          fontFamily: 'Montserrat, sans- serif ',
          spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
          colorScheme,
        }}
      >

        <Router>
          <Routes>
            {/* Routes with AppShellExmaple layout */}
            <Route element={<AppShell ><Outlet /></AppShell>}>
              <Route path="/" element={<Home />} />
              <Route path="/members" element={< Member />} />
              <Route path="/books" element={< Books />} />
              <Route />
            </Route>

            {/* 404 not found route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
