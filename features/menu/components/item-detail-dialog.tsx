import { Image, ScrollView, View, Pressable } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getImageUrl } from "@/lib/image";
import { useState, useEffect } from "react";
import type { MenuItem } from "../types/menu-item";
import { useExtras } from "../hooks/use-extras";
import type { Extra } from "../api/extras";
import { useCartStore } from "@/stores/cart-store";
import * as Haptics from "expo-haptics";

interface ItemDetailDialogProps {
  item: MenuItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ItemDetailDialog({
  item,
  open,
  onOpenChange,
}: ItemDetailDialogProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>([]);
  const { extras } = useExtras();
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (open) {
      setQuantity(1);
      setSelectedExtras([]);
    }
  }, [open]);

  if (!item) return null;

  const basePrice = item.price ?? 0;
  const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const totalPrice = (basePrice + extrasTotal) * quantity;

  const toggleExtra = (extra: Extra) => {
    setSelectedExtras((prev) => {
      const exists = prev.find((e) => e.id === extra.id);
      if (exists) {
        return prev.filter((e) => e.id !== extra.id);
      }
      return [...prev, extra];
    });
  };

  const isExtraSelected = (extra: Extra) => {
    return selectedExtras.some((e) => e.id === extra.id);
  };

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    addItem(item, selectedExtras, quantity);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85%]">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-row gap-4 mb-4">
            {item.image && (
              <Image
                source={{ uri: getImageUrl(item, item.image) }}
                className="w-32 h-32 rounded-lg"
                resizeMode="cover"
              />
            )}

            <View className="flex-1 gap-2">
              <DialogHeader>
                <DialogTitle className="text-xl">{item.name}</DialogTitle>
                {item.description && (
                  <DialogDescription className="text-sm mt-1">
                    {item.description}
                  </DialogDescription>
                )}
              </DialogHeader>

              <Text className="text-lg font-semibold text-gray-600">
                {basePrice.toFixed(2)} €
              </Text>
            </View>
          </View>

          {extras.length > 0 && (
            <View className="mb-4">
              <Text className="text-base font-semibold text-gray-900 mb-2">
                Extras
              </Text>
              <ScrollView
                style={{ maxHeight: 200 }}
                showsVerticalScrollIndicator={true}
                nestedScrollEnabled={true}
              >
                <View className="gap-2">
                  {extras.map((extra) => (
                    <Pressable
                      key={extra.id}
                      onPress={() => toggleExtra(extra)}
                      className={`flex-row items-center justify-between p-3 rounded-lg border ${
                        isExtraSelected(extra)
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <Text
                        className={`text-sm ${
                          isExtraSelected(extra)
                            ? "text-blue-700 font-semibold"
                            : "text-gray-700"
                        }`}
                      >
                        {extra.name}
                      </Text>
                      <Text
                        className={`text-sm ${
                          isExtraSelected(extra)
                            ? "text-blue-600 font-semibold"
                            : "text-gray-500"
                        }`}
                      >
                        +{extra.price.toFixed(2)} €
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </ScrollView>
            </View>
          )}

          <View className="flex-row items-center justify-between gap-4 mb-4">
            <Text className="text-base font-semibold text-gray-900">
              Quantité
            </Text>
            <View className="flex-row items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onPress={handleDecrease}
                disabled={quantity === 1}
              >
                <Text className="text-lg font-semibold">−</Text>
              </Button>
              <Text className="text-xl font-semibold text-gray-900 min-w-[40px] text-center">
                {quantity}
              </Text>
              <Button variant="outline" size="icon" onPress={handleIncrease}>
                <Text className="text-lg font-semibold">+</Text>
              </Button>
            </View>
          </View>

          <Button variant="default" onPress={handleAddToCart}>
            <Text className="text-white font-semibold">
              Ajouter • {totalPrice.toFixed(2)} €
            </Text>
          </Button>
        </ScrollView>
      </DialogContent>
    </Dialog>
  );
}
