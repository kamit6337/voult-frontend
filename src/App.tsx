import "./App.css";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { router } from "./routes/router";
import { ThemeProvider } from "./provider/ThemeProvider";
import { TooltipProvider } from "./components/ui/tooltip";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { toast, Toaster } from "sonner";
import { store } from "./redux/store";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError(error, query) {
      toast.error(error as unknown as string);
    },
  }),
  mutationCache: new MutationCache({
    onError(error) {
      toast.error(error.message);
    },
  }),
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
          <Provider store={store}>
            <Toaster richColors position="top-right" />
            <RouterProvider router={router} />,
          </Provider>
        </ThemeProvider>
      </TooltipProvider>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
