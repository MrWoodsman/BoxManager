import {
    Image,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Text,
    View,
    ScrollView,
} from "react-native";
import * as Haptics from "expo-haptics";

import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Fonts } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { SymbolView } from "expo-symbols";
import { BoxCard } from "@/components/box-card";
import { useRouter } from "expo-router";
import { BOXES_DATA } from "@/constants/data";

export default function HomeScreen() {
    const router = useRouter();
    // Funkcja wyzwalająca wibracje
    const handlePress = () => {
        // Medium daje fajne, "mięsiste" kliknięcie na iPhone
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        console.log("Pudełko dotknięte!");
    };

    const displayValues = {
        boxNumber: BOXES_DATA.length,
        itemNumber: 156,
        recentBoxes: [...BOXES_DATA]
            .sort(
                (a, b) =>
                    new Date(b.lastModified).getTime() -
                    new Date(a.lastModified).getTime(),
            )
            .slice(0, 5),
    };

    return (
        <ThemedView style={{ flex: 1 }} darkColor="#171717">
            <SafeAreaView
                edges={["top"]}
                style={{ paddingHorizontal: 16, paddingTop: 16 }}
            >
                <Text className="text-red-500">Test</Text>
                <View>
                    <ThemedText
                        type="title"
                        style={{ fontFamily: Fonts.rounded }}
                    >
                        Dzień dobry! 🖐️
                    </ThemedText>
                    <Text className="text-neutral-500 text-xl">
                        Masz trochę porządkowania?
                    </Text>
                </View>

                {/* LAST USED BOXES */}
                <View className="mt-8 flex gap-4">
                    <View className="flex-row items-center gap-2">
                        <SymbolView
                            name="clock"
                            tintColor={"#fb923c"}
                            style={{ width: 20, height: 20 }}
                        />
                        <ThemedText type="subtitle">
                            Ostatnio używane
                        </ThemedText>
                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="flex-row -mx-2"
                    >
                        {displayValues.recentBoxes.map((box) => (
                            <View key={box.id} className="w-[60vw] px-2">
                                <BoxCard
                                    id={box.id}
                                    name={box.name}
                                    location={box.location}
                                />
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* SUMMARY CARDS */}
                <View className="mt-8 flex gap-4">
                    <View className="flex-row items-center gap-2">
                        <SymbolView
                            name="chart.bar"
                            tintColor={"#fb923c"}
                            style={{ width: 20, height: 20 }}
                        />
                        <ThemedText type="subtitle">Statystyki</ThemedText>
                    </View>
                    <View className="flex-row flex-wrap -mx-2">
                        <View className="w-1/2 px-2">
                            <View className="items-center border border-neutral-700 bg-neutral-800/50 p-4 rounded-lg">
                                <Text className="text-white text-5xl font-bold">
                                    {displayValues.boxNumber}
                                </Text>
                                <Text className="text-white text-center">
                                    Pudełka
                                </Text>
                            </View>
                        </View>

                        <View className="w-1/2 px-2">
                            <View className="items-center border border-neutral-700 bg-neutral-800/50 p-4 rounded-lg">
                                <Text className="text-white text-5xl font-bold">
                                    {displayValues.itemNumber}
                                </Text>
                                <Text className="text-white text-center">
                                    Przedmioty
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* FAST INFO - EMPTY BOX / ITEMMS WITHOUT BOX */}
                <View className="flex gap-4 mt-8">
                    <View className="flex-row items-center gap-2">
                        <SymbolView
                            name="info.bubble"
                            tintColor={"#fb923c"}
                            style={{ width: 20, height: 20 }}
                        />
                        <ThemedText type="subtitle">Informacje</ThemedText>
                    </View>
                    <View className="flex gap-2">
                        <TouchableOpacity
                            onPress={() => router.push("/empty-boxes")}
                        >
                            <View className="bg-orange-500/25 border-orange-500/25 border py-2 px-4 rounded-full flex-row items-center gap-1">
                                <SymbolView
                                    name="cube.box.fill"
                                    tintColor={"#fb923c"}
                                    style={{ width: 16, height: 16 }}
                                />
                                <Text className="text-orange-400">
                                    Posiadasz{" "}
                                    <Text className="font-semibold">3</Text>{" "}
                                    puste pudełka!
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => router.push("/unassigned-items")}
                        >
                            <View className="bg-orange-500/25 border-orange-500/25 border py-2 px-4 rounded-full flex-row items-center gap-1">
                                <SymbolView
                                    name="tag.fill"
                                    tintColor={"#fb923c"}
                                    style={{ width: 16, height: 16 }}
                                />
                                <Text className="text-orange-400">
                                    Masz{" "}
                                    <Text className="font-semibold">95</Text>{" "}
                                    nie przypisane przedmioty!
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </ThemedView>
    );
}
