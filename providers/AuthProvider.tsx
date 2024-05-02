import { ClerkProvider } from "@clerk/nextjs";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          logoImageUrl: "/icons/zloom-logo.svg",
          socialButtonsVariant: "iconButton",
        },
        variables: {
          colorText: "#fff",
          colorPrimary: "#0E78F9",
          colorBackground: "#1C1F2E",
          colorInputBackground: "#252a41",
          colorInputText: "#fff",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
};

export default AuthProvider;
