import React from 'react';

import PrimaryLayout from '@layouts/PrimaryLayout';
import { Container } from '@material-ui/core';

export default function Dashboard() {
  return (
    <PrimaryLayout>
      <Container maxWidth={false}>
        <h2>
          Your Dashboard
        </h2>
      </Container>
    </PrimaryLayout>
  );
}
