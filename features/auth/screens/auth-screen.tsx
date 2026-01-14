import { useState } from "react";
import { View, TextInput, Pressable, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "expo-router";

export function AuthScreen() {
  const router = useRouter();
  const { login, register } = useAuthStore();
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }
    
    if (!isLogin && !name) {
      setError("Veuillez entrer votre nom");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password, name);
      }
      router.replace("/menu");
    } catch (err: any) {
      setError(err?.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-50"
    >
      <View className="flex-1 justify-center px-6">
        <View className="items-center mb-8">
          <Text className="text-4xl font-modak text-primary mb-2">PepeRaptor</Text>
          <Text className="text-gray-500">
            {isLogin ? "Connectez-vous a votre compte" : "Creez votre compte"}
          </Text>
        </View>

        <View className="bg-white rounded-2xl p-6 border border-gray-200">
          {!isLogin && (
            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-700 mb-2">Nom</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Votre nom"
                className="bg-gray-100 rounded-xl px-4 py-3 text-gray-900"
                autoCapitalize="words"
              />
            </View>
          )}

          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-700 mb-2">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="votre@email.com"
              className="bg-gray-100 rounded-xl px-4 py-3 text-gray-900"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View className="mb-6">
            <Text className="text-sm font-semibold text-gray-700 mb-2">Mot de passe</Text>
            <View className="relative">
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                className="bg-gray-100 rounded-xl px-4 py-3 pr-12 text-gray-900"
                secureTextEntry={!showPassword}
              />
              <Pressable 
                onPress={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3"
              >
                <Text className="text-xl">{showPassword ? "🙈" : "👁️"}</Text>
              </Pressable>
            </View>
          </View>

          {error ? (
            <View className="bg-red-50 rounded-xl p-3 mb-4">
              <Text className="text-red-600 text-sm text-center">{error}</Text>
            </View>
          ) : null}

          <Button onPress={handleSubmit} disabled={loading} className="mb-4">
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text className="text-white font-semibold">
                {isLogin ? "Se connecter" : "Creer mon compte"}
              </Text>
            )}
          </Button>

          <Pressable onPress={() => setIsLogin(!isLogin)}>
            <Text className="text-center text-primary">
              {isLogin ? "Pas de compte ? Inscrivez-vous" : "Deja un compte ? Connectez-vous"}
            </Text>
          </Pressable>
        </View>

        <Pressable onPress={() => router.back()} className="mt-6">
          <Text className="text-center text-gray-500">Continuer sans compte</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
