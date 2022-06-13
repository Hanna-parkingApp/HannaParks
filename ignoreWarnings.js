import { LogBox } from "react-native";

if (__DEV__) {
  const ignoreWarns = [
    "[react-native-gesture-handler]",
    "Require cycle: src/routes/Router.js -> src/navigation/AppStack.js -> src/screens/SignupScreen.js -> src/routes/Router.js",
    "Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle.",
    "Some dependencies are incompatible with the installed expo package version:"
  ];

  const warn = console.warn;
  console.warn = (...arg) => {
    for (const warning of ignoreWarns) {
      if (arg[0].startsWith(warning)) {
        return;
      }
    }
    warn(...arg);
  };

  LogBox.ignoreLogs(ignoreWarns);

}