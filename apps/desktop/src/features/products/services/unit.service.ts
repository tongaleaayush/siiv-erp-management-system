class UnitService {
  private readonly units = [
    "Nos",
    "Kg",
    "Gram",
    "Liter",
    "Meter",
    "Box",
    "Packet",
    "Set",
  ];

  getUnitOptions() {
    return this.units.map((unit) => ({
      value: unit,
      label: unit,
    }));
  }
}

export const unitService = new UnitService();