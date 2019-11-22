import React, { memo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator
} from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import { Card } from "../../elements/card/Card";
import { TxnItem } from "./TxnItem";
import Animated from "react-native-reanimated";
import { normalizeHeight, normalize } from "../../../utils/normalize";
import { ITransaction, IAccount } from "bank-core/dist/types";
import { TxnHeader } from "./TxnHeader";
import Constants from "expo-constants";

const renderContent = (
  sections: {
    [key: string]: {
      name: string;
      transactions: any[];
    };
  },
  loading: boolean
) => (
  <Card style={styles.card}>
    {Object.keys(sections).map(sectionKey => [
      <TxnHeader key={sections[sectionKey].name} data={sections[sectionKey]} />,
      ...sections[sectionKey].transactions.map((item, index) => (
        <TxnItem key={item.id} data={item} index={index} />
      ))
    ])}
    <ActivityIndicator animating={loading} />
  </Card>
);

const renderHeader = () => (
  <View
    style={{
      backgroundColor: "#fff",
      height: 30,
      justifyContent: "center",
      bottom: -10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10
    }}
  >
    <View
      style={{
        width: 50,
        height: 5,
        backgroundColor: "#ccc",
        borderRadius: 50,
        alignSelf: "center"
      }}
    ></View>
  </View>
);

type Props = {
  loading: boolean;
  transactions: ITransaction[];
  account: IAccount;
  sheetRef?: React.LegacyRef<BottomSheet>;
  height: number;
};

const topPosition =
  Dimensions.get("window").height - Constants.statusBarHeight - 100;

export const TransactionSheet = memo(
  ({ sheetRef, transactions, loading, height }: Props) => {
    const sections: {
      [key: string]: {
        name: string;
        transactions: any[];
      };
    } = {};

    transactions.forEach(txn => {
      if (!(txn.date in sections)) {
        sections[txn.date] = {
          name: txn.date,
          transactions: []
        };
      }
      sections[txn.date].transactions.push(txn);
    });

    return (
      <Animated.View style={{ flex: 1, elevation: 5 }}>
        <BottomSheet
          snapPoints={[
            topPosition,
            topPosition - height / 2,
            topPosition - height
          ]}
          renderContent={() => renderContent(sections, loading)}
          renderHeader={renderHeader}
          initialSnap={2}
          ref={sheetRef}
        />
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 0,
    paddingHorizontal: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: "99%"
  },
  txnList: {
    marginTop: 10
  },
  txnListHeader: {
    paddingLeft: 10,
    fontSize: normalize(20)
  }
});
