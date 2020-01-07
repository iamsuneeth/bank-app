import React, { ReactNode } from "react";
import { Button as RNButton } from "react-native-paper";
import { normalize } from "../../../utils/normalize";
import { useTheme } from "@react-navigation/native";

type ButtonProp = {
  children: ReactNode;
  primary?: boolean;
  secondary?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  style?: any;
  contentStyle?: any;
  labelStyle?: any;
};

export const Button = ({
  children,
  primary,
  secondary,
  style,
  contentStyle,
  labelStyle,
  ...rest
}: ButtonProp) => {
  const { colors } = useTheme();
  return (
    <RNButton
      {...rest}
      {...(primary && { mode: "contained" })}
      {...(secondary && {
        mode: "outlined"
      })}
      style={{
        marginVertical: normalize(5),
        ...style,
        ...(secondary && {
          borderColor: colors.primary,
          borderWidth: normalize(1)
        })
      }}
      contentStyle={{ borderRadius: 0, height: normalize(40), ...contentStyle }}
      labelStyle={{ fontSize: normalize(14), ...labelStyle }}
    >
      {children}
    </RNButton>
  );
};
