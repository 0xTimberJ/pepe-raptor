import { View, TextInput, Pressable, ScrollView, Image } from "react-native";
import { Text } from "@/components/ui/text";
import { useState, useEffect } from "react";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import QRCode from "react-native-qrcode-svg";

interface CheckoutPaymentProps {
  tableNumber: string;
  total: number;
  onPaymentSuccess?: (orderNumber: string) => void;
}

type PaymentMethod = "card" | "paypal" | "applepay" | "googlepay" | "crypto";
type PaymentStatus = "idle" | "processing" | "success";

const PAYMENT_METHODS = [
  {
    id: "card" as const,
    label: "Carte bancaire",
    desc: "Visa, Mastercard",
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png",
  },
  {
    id: "paypal" as const,
    label: "PayPal",
    desc: "Compte PayPal",
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/b7/PayPal_Logo_Icon_2014.svg",
  },
  {
    id: "applepay" as const,
    label: "Apple Pay",
    desc: "Touch ID / Face ID",
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/488px-Apple_logo_black.svg.png",
  },
  {
    id: "googlepay" as const,
    label: "Google Pay",
    desc: "Paiement rapide",
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/512px-Google_Pay_Logo.svg.png",
  },
  {
    id: "crypto" as const,
    label: "Crypto",
    desc: "BTC • ETH • SOL",
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
  },
];

export function CheckoutPayment({
  tableNumber,
  total,
  onPaymentSuccess,
}: CheckoutPaymentProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const handlePaymentSuccess = () => {
    setPaymentStatus("processing");
    setTimeout(() => {
      const orderNum = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      setPaymentStatus("success");
      onPaymentSuccess?.(orderNum);
    }, 2000);
  };

  const isCardValid =
    cardNumber.length >= 16 && cardExpiry.length >= 4 && cardCvv.length === 3;

  if (paymentStatus === "processing") {
    return (
      <View
        className="flex-1 items-center justify-center p-8"
        style={{ minHeight: 400 }}
      >
        <Animated.View entering={FadeIn} className="items-center">
          <View className="w-24 h-24 rounded-full bg-blue-100 items-center justify-center mb-6">
            <Text className="text-5xl">⏳</Text>
          </View>
          <Text className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Paiement en cours
          </Text>
          <Text className="text-gray-600 text-center">
            Traitement de votre paiement...
          </Text>
        </Animated.View>
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="pb-6">
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-900 mb-1">
            Choisir un mode de paiement
          </Text>
          <Text className="text-sm text-gray-500">
            Sélectionnez votre méthode préférée
          </Text>
        </View>

        <View className="gap-3 mb-6">
          {PAYMENT_METHODS.map((method, index) => {
            const isSelected = selectedMethod === method.id;
            return (
              <Animated.View
                key={method.id}
                entering={FadeInDown.delay(index * 80)}
              >
                <Pressable
                  onPress={() => setSelectedMethod(method.id)}
                  className={`flex-row items-center p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 bg-white"
                  }`}
                  style={{
                    shadowColor: isSelected ? "#f97316" : "#000",
                    shadowOffset: { width: 0, height: isSelected ? 4 : 1 },
                    shadowOpacity: isSelected ? 0.15 : 0.05,
                    shadowRadius: isSelected ? 8 : 2,
                    elevation: isSelected ? 4 : 1,
                  }}
                >
                  <View
                    className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${
                      isSelected ? "bg-white" : "bg-gray-100"
                    }`}
                  >
                    <Image
                      source={{ uri: method.iconUrl }}
                      style={{ width: 28, height: 28 }}
                      resizeMode="contain"
                    />
                  </View>
                  <View className="flex-1">
                    <Text
                      className={`font-semibold text-base ${
                        isSelected ? "text-gray-900" : "text-gray-700"
                      }`}
                    >
                      {method.label}
                    </Text>
                    <Text
                      className={`text-sm ${
                        isSelected ? "text-gray-600" : "text-gray-500"
                      }`}
                    >
                      {method.desc}
                    </Text>
                  </View>
                  <View
                    className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                      isSelected ? "border-primary" : "border-gray-300"
                    }`}
                  >
                    {isSelected && (
                      <View className="w-3 h-3 rounded-full bg-primary" />
                    )}
                  </View>
                </Pressable>
              </Animated.View>
            );
          })}
        </View>

        {selectedMethod === "card" && (
          <CardPayment
            cardNumber={cardNumber}
            cardExpiry={cardExpiry}
            cardCvv={cardCvv}
            onCardNumberChange={setCardNumber}
            onCardExpiryChange={setCardExpiry}
            onCardCvvChange={setCardCvv}
            onPayment={handlePaymentSuccess}
            isValid={isCardValid}
          />
        )}
        {selectedMethod === "paypal" && (
          <SimplePayment
            method="PayPal"
            iconUrl="https://upload.wikimedia.org/wikipedia/commons/b/b7/PayPal_Logo_Icon_2014.svg"
            color="bg-blue-500"
            onPayment={handlePaymentSuccess}
          />
        )}
        {selectedMethod === "applepay" && (
          <SimplePayment
            method="Apple Pay"
            iconUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/488px-Apple_logo_black.svg.png"
            color="bg-gray-900"
            onPayment={handlePaymentSuccess}
          />
        )}
        {selectedMethod === "googlepay" && (
          <SimplePayment
            method="Google Pay"
            iconUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/512px-Google_Pay_Logo.svg.png"
            color="bg-blue-600"
            onPayment={handlePaymentSuccess}
          />
        )}
        {selectedMethod === "crypto" && (
          <CryptoPayment
            total={total}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}

        <View className="bg-gray-50 rounded-2xl p-5 mt-6 border border-gray-200">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-gray-600 text-sm font-medium">Table N°</Text>
            <Text className="font-bold text-gray-900 text-lg">
              {tableNumber}
            </Text>
          </View>
          <View className="h-px bg-gray-200 mb-3" />
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-900 text-base font-semibold">
              Total à payer
            </Text>
            <Text className="font-bold text-gray-900 text-2xl">
              {total.toFixed(2)} €
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function CardPayment({
  cardNumber,
  cardExpiry,
  cardCvv,
  onCardNumberChange,
  onCardExpiryChange,
  onCardCvvChange,
  onPayment,
  isValid,
}: {
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  onCardNumberChange: (value: string) => void;
  onCardExpiryChange: (value: string) => void;
  onCardCvvChange: (value: string) => void;
  onPayment: () => void;
  isValid: boolean;
}) {
  return (
    <Animated.View
      entering={FadeIn}
      className="bg-white rounded-2xl p-5 border border-gray-200 mb-4"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
      }}
    >
      <View className="mb-5">
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          Numéro de carte
        </Text>
        <TextInput
          placeholder="1234 5678 9012 3456"
          placeholderTextColor="#9ca3af"
          className="bg-gray-50 rounded-lg px-4 py-3.5 text-gray-900 border border-gray-200 text-base"
          keyboardType="number-pad"
          maxLength={19}
          value={cardNumber}
          onChangeText={onCardNumberChange}
        />
      </View>

      <View className="flex-row gap-3 mb-5">
        <View className="flex-1">
          <Text className="text-sm font-semibold text-gray-700 mb-2">
            Expiration
          </Text>
          <TextInput
            placeholder="MM/AA"
            placeholderTextColor="#9ca3af"
            className="bg-gray-50 rounded-lg px-4 py-3.5 text-gray-900 border border-gray-200 text-base"
            maxLength={5}
            value={cardExpiry}
            onChangeText={onCardExpiryChange}
          />
        </View>
        <View className="flex-1">
          <Text className="text-sm font-semibold text-gray-700 mb-2">CVV</Text>
          <TextInput
            placeholder="123"
            placeholderTextColor="#9ca3af"
            className="bg-gray-50 rounded-lg px-4 py-3.5 text-gray-900 border border-gray-200 text-base"
            keyboardType="number-pad"
            maxLength={3}
            secureTextEntry
            value={cardCvv}
            onChangeText={onCardCvvChange}
          />
        </View>
      </View>

      <Pressable
        onPress={onPayment}
        disabled={!isValid}
        className={`py-4 rounded-xl ${isValid ? "bg-gray-900" : "bg-gray-300"}`}
        style={{
          shadowColor: isValid ? "#000" : "transparent",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: isValid ? 0.2 : 0,
          shadowRadius: 8,
          elevation: isValid ? 4 : 0,
        }}
      >
        <Text
          className={`font-bold text-center text-base ${
            isValid ? "text-white" : "text-gray-500"
          }`}
        >
          Payer par carte
        </Text>
      </Pressable>
    </Animated.View>
  );
}

function SimplePayment({
  method,
  iconUrl,
  color,
  onPayment,
}: {
  method: string;
  iconUrl: string;
  color: string;
  onPayment: () => void;
}) {
  const bgClass = color;
  const isBlue = color.includes("blue");
  const isDark = color.includes("gray-900");

  return (
    <Animated.View
      entering={FadeIn}
      className="bg-white rounded-2xl p-6 mb-4 border-2 border-gray-200"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
      }}
    >
      <View className="items-center">
        <View className="w-20 h-20 rounded-full bg-gray-50 items-center justify-center mb-4 border-2 border-gray-200">
          <Image
            source={{ uri: iconUrl }}
            style={{ width: 56, height: 56 }}
            resizeMode="contain"
          />
        </View>
        <Text className="text-gray-900 text-xl font-bold mb-2">{method}</Text>
        <Text className="text-gray-600 text-sm text-center mb-6">
          Authentification sécurisée
        </Text>

        <Pressable
          onPress={onPayment}
          className={`w-full py-4 ${bgClass} rounded-xl border-2 ${
            isDark
              ? "border-gray-800"
              : isBlue
                ? "border-blue-600"
                : "border-blue-500"
          }`}
          style={{
            shadowColor: isDark ? "#000" : isBlue ? "#2563eb" : "#3b82f6",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <Text className="text-white font-bold text-center text-base">
            Payer avec {method}
          </Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

type Crypto = "btc" | "eth" | "sol";

const CRYPTOS = [
  {
    id: "btc" as const,
    name: "Bitcoin",
    symbol: "BTC",
    iconUrl: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    color: "#F7931A",
    bgColor: "bg-orange-500",
    rate: 95000,
  },
  {
    id: "eth" as const,
    name: "Ethereum",
    symbol: "ETH",
    iconUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    color: "#627EEA",
    bgColor: "bg-blue-500",
    rate: 3500,
  },
  {
    id: "sol" as const,
    name: "Solana",
    symbol: "SOL",
    iconUrl: "https://cryptologos.cc/logos/solana-sol-logo.png",
    color: "#14F195",
    bgColor: "bg-purple-500",
    rate: 180,
  },
];

function CryptoPayment({
  total,
  onPaymentSuccess,
}: {
  total: number;
  onPaymentSuccess: () => void;
}) {
  const [selectedCrypto, setSelectedCrypto] = useState<Crypto>("btc");
  const [showPayment, setShowPayment] = useState(false);

  const crypto = CRYPTOS.find((c) => c.id === selectedCrypto)!;

  if (showPayment) {
    return (
      <CryptoPaymentDetails
        crypto={crypto}
        totalEur={total}
        onBack={() => setShowPayment(false)}
        onPaymentSuccess={onPaymentSuccess}
      />
    );
  }

  return (
    <Animated.View
      entering={FadeIn}
      className="bg-white rounded-2xl p-5 border border-gray-200 mb-4"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
      }}
    >
      <Text className="text-base font-bold text-gray-900 mb-4">
        Sélectionnez votre crypto-monnaie
      </Text>

      <View className="gap-3 mb-5">
        {CRYPTOS.map((c, index) => {
          const isSelected = selectedCrypto === c.id;
          const cryptoAmount = (total / c.rate).toFixed(6);
          return (
            <Animated.View key={c.id} entering={FadeInDown.delay(index * 100)}>
              <Pressable
                onPress={() => setSelectedCrypto(c.id)}
                className={`p-4 rounded-xl border-2 ${
                  isSelected
                    ? "border-gray-900 bg-gray-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <View className="flex-row items-center">
                  <View
                    className={`w-12 h-12 rounded-full bg-white items-center justify-center mr-3 border border-gray-200`}
                  >
                    <Image
                      source={{ uri: c.iconUrl }}
                      style={{ width: 32, height: 32 }}
                      resizeMode="contain"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-base text-gray-900">
                      {c.name}
                    </Text>
                    <Text className="text-sm text-gray-500">
                      ≈ {cryptoAmount} {c.symbol}
                    </Text>
                  </View>
                  <View
                    className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                      isSelected ? "border-gray-900" : "border-gray-300"
                    }`}
                  >
                    {isSelected && (
                      <View className="w-3 h-3 rounded-full bg-gray-900" />
                    )}
                  </View>
                </View>
              </Pressable>
            </Animated.View>
          );
        })}
      </View>

      <Pressable
        onPress={() => setShowPayment(true)}
        className="bg-gray-900 py-4 rounded-xl"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 4,
        }}
      >
        <Text className="text-white font-bold text-center text-base">
          Continuer avec {crypto.name}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

type CryptoPaymentStatus = "waiting" | "processing";

function CryptoPaymentDetails({
  crypto,
  totalEur,
  onBack,
  onPaymentSuccess,
}: {
  crypto: (typeof CRYPTOS)[0];
  totalEur: number;
  onBack: () => void;
  onPaymentSuccess: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState(600);
  const [cryptoStatus, setCryptoStatus] =
    useState<CryptoPaymentStatus>("waiting");

  const cryptoAmount = (totalEur / crypto.rate).toFixed(6);
  const address = `${crypto.symbol}1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R`;

  useEffect(() => {
    if (cryptoStatus === "waiting") {
      const timer = setInterval(() => {
        setTimeLeft((t) => (t > 0 ? t - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cryptoStatus]);

  const handleSimulatePayment = () => {
    setCryptoStatus("processing");
    setTimeout(() => {
      onPaymentSuccess();
    }, 2000);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = (timeLeft / 600) * 100;

  if (cryptoStatus === "processing") {
    return (
      <Animated.View
        entering={FadeIn}
        className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden mb-4 p-8"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 4,
          minHeight: 300,
        }}
      >
        <View className="items-center justify-center flex-1">
          <View className="w-24 h-24 rounded-full bg-blue-100 items-center justify-center mb-6">
            <Text className="text-5xl">⏳</Text>
          </View>
          <Text className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Paiement reçu
          </Text>
          <Text className="text-gray-600 text-center">
            Vérification de la transaction en cours...
          </Text>
        </View>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      entering={FadeIn}
      className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden mb-4"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 4,
      }}
    >
      {/* Header */}
      <View className="p-5" style={{ backgroundColor: crypto.color }}>
        <Pressable onPress={onBack} className="mb-3">
          <Text className="text-white text-base font-semibold">← Retour</Text>
        </Pressable>
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-white text-xl font-bold mb-1">
              Payer avec {crypto.name}
            </Text>
            <Text className="text-white/90 text-base font-semibold">
              {cryptoAmount} {crypto.symbol}
            </Text>
            <Text className="text-white/70 text-sm mt-1">
              ≈ {totalEur.toFixed(2)} €
            </Text>
          </View>
          <View className="w-16 h-16 rounded-full bg-white items-center justify-center">
            <Image
              source={{ uri: crypto.iconUrl }}
              style={{ width: 48, height: 48 }}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      <View className="p-5">
        {/* Timer */}
        <View className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-5 mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-gray-700 text-base font-bold">
              Temps restant
            </Text>
            <Text className="text-gray-900 text-3xl font-mono font-bold">
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </Text>
          </View>
          <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <View
              className="h-full bg-gray-900 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </View>
          <Text className="text-gray-600 text-xs text-center mt-2">
            La transaction expire dans {minutes} minutes
          </Text>
        </View>

        {/* QR Code */}
        <View className="items-center mb-6">
          <View
            className="bg-white p-6 rounded-2xl border-2 border-gray-200"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <QRCode
              value={address}
              size={200}
              color="#000000"
              backgroundColor="#FFFFFF"
            />
          </View>
          <View className="bg-gray-900 rounded-lg px-4 py-2 mt-3">
            <Text className="text-white text-xs font-semibold">
              Scannez pour payer
            </Text>
          </View>
        </View>

        {/* Address */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-700 mb-2 text-center">
            Adresse {crypto.symbol}
          </Text>
          <View className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <Text
              className="text-xs font-mono text-center text-gray-900 leading-5"
              selectable
            >
              {address}
            </Text>
          </View>
          <Pressable className="mt-3 py-2.5 bg-gray-900 rounded-lg">
            <Text className="text-white text-sm font-semibold text-center">
              Copier l&apos;adresse
            </Text>
          </Pressable>
        </View>

        {/* Instructions */}
        <View className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200">
          <Text className="text-blue-900 font-bold text-base mb-3">
            Instructions
          </Text>
          <View className="gap-2.5">
            <View className="flex-row">
              <Text className="text-blue-900 font-bold text-sm mr-2">1.</Text>
              <Text className="text-blue-800 text-sm flex-1">
                Ouvrez votre wallet crypto
              </Text>
            </View>
            <View className="flex-row">
              <Text className="text-blue-900 font-bold text-sm mr-2">2.</Text>
              <Text className="text-blue-800 text-sm flex-1">
                Scannez le QR code ou copiez l&apos;adresse
              </Text>
            </View>
            <View className="flex-row">
              <Text className="text-blue-900 font-bold text-sm mr-2">3.</Text>
              <Text className="text-blue-800 text-sm flex-1">
                Envoyez exactement {cryptoAmount} {crypto.symbol}
              </Text>
            </View>
            <View className="flex-row">
              <Text className="text-blue-900 font-bold text-sm mr-2">4.</Text>
              <Text className="text-blue-800 text-sm flex-1">
                Attendez la confirmation (≈ 2-5 min)
              </Text>
            </View>
          </View>
        </View>

        {/* Summary */}
        <View className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
          <Text className="text-gray-900 font-bold text-sm mb-3">
            Résumé de la transaction
          </Text>
          <View className="gap-2">
            <View className="flex-row justify-between">
              <Text className="text-gray-600 text-sm">Montant</Text>
              <Text className="text-gray-900 font-semibold text-sm">
                {cryptoAmount} {crypto.symbol}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600 text-sm">Valeur</Text>
              <Text className="text-gray-900 font-semibold text-sm">
                {totalEur.toFixed(2)} €
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600 text-sm">Réseau</Text>
              <Text className="text-gray-900 font-semibold text-sm">
                {crypto.name}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600 text-sm">Frais</Text>
              <Text className="text-green-600 font-semibold text-sm">
                Gratuit
              </Text>
            </View>
          </View>
        </View>

        {/* Dev Button */}
        <Pressable
          onPress={handleSimulatePayment}
          className="mt-6 py-4 bg-green-600 rounded-xl"
          style={{
            shadowColor: "#16a34a",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <Text className="text-white font-bold text-center text-base">
            🔧 Simuler paiement reçu (dev)
          </Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}
