import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { LinkButton } from "@/components/link-button";
import { Product } from "@/components/product";
import { useCartStore } from "@/stores/cart-stores";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Feather } from "@expo/vector-icons";
import { Link, useNavigation } from "expo-router";
import { Alert, Linking, ScrollView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ProductProps } from "@/utils/data/products";
import { useState } from "react";

const PHONE_NUMBER = "5551999790193"

export default function Cart() {
  const cartStore = useCartStore();

  const navigation = useNavigation();

  const [address, setAddress] = useState("");

  const total = formatCurrency(
    cartStore.products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    )
  );

  function handleProductRemove(product: ProductProps) {
    Alert.alert(
      "Remover produto",
      `Deseja remover o produto ${product.title} do carrinho?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Remover",
          style: "destructive",
          onPress: () => cartStore.remove(product.id),
        },
      ]
    );
  }

  function handleOrder() {
    if (address.trim().length === 0) {
      return Alert.alert("Pedido", "Informe o endereço de entrega.");
    }

    const products = cartStore.products
      .map((product) => `\n ${product.quantity} ${product.title}`)
      .join("");

    const message = `
    🍔 NOVO PEDIDO
    \n Entregar em: ${address}  
    \n Produtos: ${products}
    \n Total: ${total}
    `;

    Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`);

    cartStore.clear();
    navigation.goBack();
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Carrinho" />
      <ScrollView>
        {cartStore.products.length === 0 ? (
          <Text className="font-body text-xl text-slate-400 text-center my-8">
            Seu carrinho está vazio.
          </Text>
        ) : (
          <View>
            <View className="p-5 flex-1">
              <KeyboardAwareScrollView>
                <View className="border-b border-slate-400">
                  {cartStore.products.map((product) => (
                    <Product
                      key={product.id}
                      data={product}
                      onPress={() => handleProductRemove(product)}
                    />
                  ))}
                </View>

                <View className="flex-row gap-2 items-center mt-5 mb-4">
                  <Text className="text-white text-xl font-subtitle">
                    Total:
                  </Text>
                  <Text className="text-lime-300 text-2xl font-heading">
                    {total}
                  </Text>
                </View>

                <Input
                  blurOnSubmit
                  returnKeyType="next"
                  onChangeText={setAddress}
                  onSubmitEditing={handleOrder}
                  placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento..."
                />
              </KeyboardAwareScrollView>
            </View>

            <View className="p-5 gap-5">
              <Button onPress={handleOrder}>
                <Button.Text>Finalizar pedido</Button.Text>
                <Button.Icon>
                  <Feather name="arrow-right-circle" size={20} />
                </Button.Icon>
              </Button>
            </View>
          </View>
        )}
        <LinkButton href="/" title="Voltar ao cardápio" />
      </ScrollView>
    </View>
  );
}
