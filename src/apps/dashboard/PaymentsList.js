// @flow

import * as React from 'react';
import {ScrollView} from 'react-native';
import {QueryRenderer, graphql} from '_relay';
import type {PaymentsListQueryResponse} from '__generated__/PaymentsListQuery.graphql';

import PaymentRow from './PaymentRow';

function renderQueryRendererResult(props: PaymentsListQueryResponse) {
  const payments = props.scenes?.dashboard?.payments ?? [];
  return (
    <ScrollView>
      {payments.map(payment => {
        if (payment) {
          return <PaymentRow key={payment.id} data={payment} />;
        }
        return undefined;
      })}
    </ScrollView>
  );
}

export default function PaymentsList() {
  return (
    <QueryRenderer
      query={graphql`
        query PaymentsListQuery($clientId: ID!) {
          scenes {
            dashboard {
              payments(clientId: $clientId) {
                id
                ...PaymentRow_data
              }
            }
          }
        }
      `}
      variables={{
        // TODO: this should be stored in the device after onboarding
        clientId: 'EA53A691-9970-46BB-BACD-80D4A120334E',
      }}
      render={renderQueryRendererResult}
    />
  );
}
