import { useState } from "react";
import { View, TextInput, Pressable, Modal, StyleSheet } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { CameraView, useCameraPermissions } from "expo-camera";

interface CheckoutTableProps {
  tableNumber: string;
  onTableChange: (value: string) => void;
}

export function CheckoutTable({ tableNumber, onTableChange }: CheckoutTableProps) {
  const [showScanner, setShowScanner] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    // Extract table number from QR code (format: "TABLE:12" or just "12")
    const match = data.match(/(?:TABLE:)?(\d+)/i);
    if (match) {
      onTableChange(match[1]);
      setShowScanner(false);
    }
  };

  const openScanner = async () => {
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        alert("Permission camera requise pour scanner le QR code");
        return;
      }
    }
    setShowScanner(true);
  };

  return (
    <View className="bg-white rounded-xl p-6">
      <Text className="text-lg font-semibold text-gray-900 mb-4 text-center">
        Entrez votre numero de table
      </Text>
      
      <TextInput
        value={tableNumber}
        onChangeText={onTableChange}
        placeholder="Ex: 12"
        className="bg-gray-100 rounded-xl px-4 py-4 text-center text-2xl text-gray-900"
        keyboardType="number-pad"
        maxLength={3}
      />

      <View className="items-center my-4">
        <Text className="text-gray-400">ou</Text>
      </View>

      <Pressable
        onPress={openScanner}
        className="bg-primary/10 rounded-xl p-4 items-center"
      >
        <Text className="text-3xl mb-2">📷</Text>
        <Text className="text-primary font-semibold">Scanner le QR code</Text>
        <Text className="text-gray-500 text-sm">sur votre table</Text>
      </Pressable>

      <Modal visible={showScanner} animationType="slide">
        <View style={styles.container}>
          <CameraView
            style={styles.camera}
            facing="back"
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            onBarcodeScanned={handleBarCodeScanned}
          >
            <View style={styles.overlay}>
              <View style={styles.header}>
                <Pressable onPress={() => setShowScanner(false)}>
                  <Text className="text-white text-lg">✕ Fermer</Text>
                </Pressable>
              </View>
              
              <View style={styles.scanArea}>
                <View style={styles.corner} />
              </View>
              
              <View style={styles.footer}>
                <Text className="text-white text-center text-lg">
                  Scannez le QR code sur votre table
                </Text>
              </View>
            </View>
          </CameraView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  scanArea: {
    width: 250,
    height: 250,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 20,
  },
  corner: {},
  footer: {
    padding: 40,
  },
});
