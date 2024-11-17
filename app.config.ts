import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "ExpoCalendarWriteOnly",
  slug: "ExpoCalendarWriteOnly",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.gunnartorfis.ExpoCalendarWriteOnly",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.gunnartorfis.ExpoCalendarWriteOnly",
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
    ],
    [
      "react-native-permissions",
      {
        // Add setup_permissions to your Podfile (see iOS setup - steps 1, 2 and 3)
        iosPermissions: ["CalendarsWriteOnly"],
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
});
