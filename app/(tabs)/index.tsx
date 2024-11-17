import { Image, StyleSheet, Platform, Button } from "react-native";
import * as Calendar from "expo-calendar";
import * as Permissions from "react-native-permissions";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const allPermssionGranted = (result: Record<string, string>) => {
  return Object.values(result).every(
    (permission) => permission === Permissions.RESULTS.GRANTED
  );
};

export default function HomeScreen() {
  const onPressAddToCalendar = async () => {
    const allResults = await Permissions.requestMultiple(
      Platform.select({
        ios: [Permissions.PERMISSIONS.IOS.CALENDARS_WRITE_ONLY],
        android: [
          Permissions.PERMISSIONS.ANDROID.WRITE_CALENDAR,
          Permissions.PERMISSIONS.ANDROID.READ_CALENDAR,
        ],
      })!
    );

    const granted = allPermssionGranted(allResults);

    if (!granted) {
      throw new Error(`No permission`);
    }

    try {
      await Calendar.createEventInCalendarAsync({
        title: "No need for READ access",
        startDate: new Date(),
        endDate: new Date(new Date().getTime() + 60 * 60 * 1000),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <Button title="Add to calendar" onPress={onPressAddToCalendar} />
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: "cmd + d",
              android: "cmd + m",
              web: "F12",
            })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this
          starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{" "}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{" "}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
          directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
