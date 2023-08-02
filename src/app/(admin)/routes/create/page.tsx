import React from "react";
import { Card } from "~/components/ui/card";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { RuteForm } from "~/components/forms/rute-form";
import CardRuteForm from "~/components/cards/rute-card-form";

export default function Create() {
  return (
    <div className="w-full flex justify-center">
      <CardRuteForm />
    </div>
  );
}
