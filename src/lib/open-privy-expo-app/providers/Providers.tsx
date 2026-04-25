import { ReactNode } from 'react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from "@open-privy-expo-app/theme";
import { AuthFlowProvider } from '@open-privy-expo-app/context/AuthFlowContext';
import CustomPrivyProvider from './CustomPrivyProvider';
import CustomQueryClientProvider from './CustomQueryClientProvider';
import CustomGestureHandlerRootView from './CustomGestureHandlerRootView';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <CustomGestureHandlerRootView>
          <BottomSheetModalProvider>
            <CustomPrivyProvider>
              <AuthFlowProvider>
                <CustomQueryClientProvider>
                  {children}
                </CustomQueryClientProvider>
              </AuthFlowProvider>
            </CustomPrivyProvider>
          </BottomSheetModalProvider>
        </CustomGestureHandlerRootView>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}   
