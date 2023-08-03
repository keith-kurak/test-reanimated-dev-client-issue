import { View, Text } from "react-native";

import PagerView from "react-native-pager-view";
import Animated, {
  useSharedValue,
  useEvent,
  useHandler,
  useAnimatedStyle,
} from "react-native-reanimated";

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

function useAnimatedPagerScrollHandler(handlers, dependencies) {
  const { context, doDependenciesDiffer } = useHandler(handlers, dependencies);

  return useEvent(
    (event) => {
      "worklet";
      console.log({ event });
      const { onPageScroll } = handlers;

      if (onPageScroll && event.eventName.endsWith("onPageScroll")) {
        onPageScroll(event, context);
      }
    },
    ["onPageScroll"],
    doDependenciesDiffer
  );
}

const PagerExample = () => {
  const scrollPosition = useSharedValue(0);

  const scrollHandler = useAnimatedPagerScrollHandler({
    onPageScroll: (e) => {
      "worklet";
      console.log(1212121, { e });
      scrollPosition.value = e.offset * 100;
    },
  });
  const style = useAnimatedStyle(
    () => ({
      position: "absolute",
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: "yellow",
      transform: [{ translateY: scrollPosition.value }],
    }),
    []
  );

  return (
    <>
      <AnimatedPagerView
        style={{ flex: 1 }}
        initialPage={0}
        onPageScroll={scrollHandler}
      >
        <View style={{ backgroundColor: "red" }} collapsable={false}>
          <Text>{`Page ${1}`}</Text>
        </View>
        <View collapsable={false}>
          <Text>{`Page ${2}`}</Text>
        </View>
      </AnimatedPagerView>
      <Animated.View style={style} />
    </>
  );
};

function App() {
  return <PagerExample />;
}

export default App;