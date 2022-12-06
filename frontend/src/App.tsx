import { ColorScheme, MantineProvider, Text } from "@mantine/core"
import { useLocalStorage } from "@mantine/hooks"

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
        colorScheme: 'dark'
      }}
    >
      <Text>Hello World!</Text>
    </MantineProvider>
  )
}

export default App
