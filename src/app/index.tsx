import { CategoryButton } from "@/components/category-button";
import { Header } from "@/components/header";
import { View, FlatList, SectionList, Text } from "react-native";
import { CATEGORIES, MENU, ProductProps } from "@/utils/data/products";
import { useRef, useState } from "react";
import { Product } from "@/components/product";
import { Link } from "expo-router";
import { useCartStore } from "@/stores/cart-stores";


export default function App() {
  const cartStore = useCartStore();

  const [category, setCategory] = useState(CATEGORIES[0]);

  const sectionListRef = useRef<SectionList<ProductProps>>(null);

  const quantityCard = cartStore.products.reduce((acc, product) => acc + product.quantity, 0)

  function handleCategorySelect(category: string) {
    setCategory(category);

    const sectionIndex = MENU.findIndex((section) => section.title === category);

    sectionListRef.current?.scrollToLocation({
      sectionIndex,
      itemIndex: 0,
      animated: true,
    });
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Faça seu pedido" quantityCard={quantityCard} />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            onPress={() => handleCategorySelect(item)}
            isSelected={category === item}
          />
        )}
        horizontal
        className="max-h-10 mt-5 mb-2"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20, }}
      />

      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-lime-300 font-subtitle text-lg my-2">{title}</Text>
        )}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        className="flex-1 p-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
