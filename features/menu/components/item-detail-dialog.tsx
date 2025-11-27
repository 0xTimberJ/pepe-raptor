import { Image, ScrollView, View } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { pb } from "@/lib/pocketbase";
import { useState } from "react";
import type { MenuItem } from "../types/menu-item";

interface ItemDetailDialogProps {
  item: MenuItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function getImageUrl(record: MenuItem, filename: string): string {
  return pb.files.getURL(record, filename);
}

export function ItemDetailDialog({
  item,
  open,
  onOpenChange,
}: ItemDetailDialogProps) {
  const [quantity, setQuantity] = useState(0);

  if (!item) return null;

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(0, prev - 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    // TODO: Add to cart logic
    console.log("Add to cart:", item, quantity);
    onOpenChange(false);
    setQuantity(0);
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

              <Text className="text-2xl font-bold text-blue-600">
                {(item.price ?? 0).toFixed(2)} €
              </Text>
            </View>
          </View>

          <View className="flex-row items-center justify-between gap-4 mb-4">
            <Text className="text-base font-semibold text-gray-900">
              Quantité
            </Text>
            <View className="flex-row items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onPress={handleDecrease}
                disabled={quantity === 0}
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

          <Button
            variant="default"
            onPress={handleAddToCart}
            disabled={quantity === 0}
          >
            <Text>Ajouter au panier</Text>
          </Button>
        </ScrollView>
      </DialogContent>
    </Dialog>
  );
}
