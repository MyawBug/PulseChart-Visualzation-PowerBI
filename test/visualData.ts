module powerbi.extensibility.visual.test {

    // powerbi.extensibility.utils.type
    import ValueType = powerbi.extensibility.utils.type.ValueType;

    // powerbi.extensibility.utils.test
    import TestDataViewBuilder = powerbi.extensibility.utils.test.dataViewBuilder.TestDataViewBuilder;
    import helpers = powerbi.extensibility.utils.test.helpers;
    import testHelpers = powerbi.extensibility.visual.test.helpers;

    export class PulseChartData extends TestDataViewBuilder {
        public static ColumnTimestamp: string = "Timestamp";
        public static ColumnValue: string = "Value";
        public static ColumnEventTitle: string = "Event Title";
        public static ColumnEventDescription: string = "Event Description";
        public static ColumnEventSize: string = "Event Size";
        public valuesTimestamp =  testHelpers.getRandomUniqueSortedDates(100, new Date(2014, 0, 1), new Date(2015, 5, 10));
        public valuesValue: number[] = helpers.getRandomNumbers(this.valuesTimestamp.length, 100, 1000);
        public valuesEvents: any[] = this.generateEvents(this.valuesValue.length, 5);
        public getDataView(columnNames?: string[], isDateAsString?: boolean): powerbi.DataView {
            let dateValues: string[] | Date[] = this.valuesTimestamp;

            if (isDateAsString) {
                dateValues = dateValues.map((v: Date) => v.toISOString());
            }

            return this.createCategoricalDataViewBuilder([
                {
                    source: {
                        displayName: PulseChartData.ColumnTimestamp,
                        format: "G",
                        type: ValueType.fromDescriptor({ dateTime: true }),
                        roles: { Timestamp: true }
                    },
                    values: dateValues
                },
                {
                    source: {
                        displayName: PulseChartData.ColumnEventTitle,
                        type: ValueType.fromDescriptor({ text: true }),
                        roles: { EventTitle: true }
                    },
                    values: this.valuesEvents.map(x => x && x.title)
                },
                {
                    source: {
                        displayName: PulseChartData.ColumnEventDescription,
                        type: ValueType.fromDescriptor({ text: true }),
                        roles: { EventDescription: true }
                    },
                    values: this.valuesEvents.map(x => x && x.description)
                },
                {
                    source: {
                        displayName: PulseChartData.ColumnEventSize,
                        type: ValueType.fromDescriptor({ integer: true }),
                        roles: { EventSize: true }
                    },
                    values: this.valuesEvents.map(x => x && x.EventSize)
                }
            ], [
                    {
                        source: {
                            displayName: PulseChartData.ColumnValue,
                            type: ValueType.fromDescriptor({ integer: true }),
                            roles: { Value: true }
                        },
                        values: this.valuesValue
                    }
                ], columnNames).build();
        }

        public getDataViewWithNumbersInsteadDate(columnNames?: string[], isDateAsString?: boolean): powerbi.DataView {
            return this.createCategoricalDataViewBuilder([
                {
                    source: {
                        displayName: PulseChartData.ColumnTimestamp,
                        format: "G",
                        type: ValueType.fromDescriptor({ dateTime: true }),
                        roles: { Timestamp: true }
                    },
                    values: this.valuesValue
                },
                {
                    source: {
                        displayName: PulseChartData.ColumnEventTitle,
                        type: ValueType.fromDescriptor({ text: true }),
                        roles: { EventTitle: true }
                    },
                    values: this.valuesEvents.map(x => x && x.title)
                },
                {
                    source: {
                        displayName: PulseChartData.ColumnEventDescription,
                        type: ValueType.fromDescriptor({ text: true }),
                        roles: { EventDescription: true }
                    },
                    values: this.valuesEvents.map(x => x && x.description)
                }
            ], [
                    {
                        source: {
                            displayName: PulseChartData.ColumnValue,
                            type: ValueType.fromDescriptor({ integer: true }),
                            roles: { Value: true }
                        },
                        values: this.valuesValue
                    }
                ], columnNames).build();
        }

        public getDataViewWithSingleDate(columnNames?: string[]): powerbi.DataView {
            return this.createCategoricalDataViewBuilder([
                {
                    source: {
                        displayName: PulseChartData.ColumnTimestamp,
                        format: "G",
                        type: ValueType.fromDescriptor({ dateTime: true }),
                        roles: { Timestamp: true }
                    },
                    values: [this.valuesTimestamp[0], this.valuesTimestamp[0]]
                },
                {
                    source: {
                        displayName: PulseChartData.ColumnEventTitle,
                        type: ValueType.fromDescriptor({ text: true }),
                        roles: { EventTitle: true }
                    },
                    values: [this.valuesEvents.map(x => x && x.title)[20]]
                },
                {
                    source: {
                        displayName: PulseChartData.ColumnEventDescription,
                        type: ValueType.fromDescriptor({ text: true }),
                        roles: { EventDescription: true }
                    },
                    values: [this.valuesEvents.map(x => x && x.description)[20]]
                }
            ], [
                {
                    source: {
                        displayName: PulseChartData.ColumnValue,
                        type: ValueType.fromDescriptor({ integer: true }),
                        roles: { Value: true }
                    },
                    values: [this.valuesValue[0]]
                }
            ], columnNames).build();
        }

        private generateEvents(valuesCount: number, eventCount: number): any[] {
            let startIndex = valuesCount / eventCount;
            let eventIndexesSpace = (valuesCount - startIndex) / eventCount;
            let eventIndexes = d3.range(eventCount).map(x => startIndex + x * eventIndexesSpace);
            let events = d3.range(valuesCount).map(x =>
                eventIndexes.some(index => index === x)
                    ? {
                        title: testHelpers.getRandomWord(6, 12),
                        description: testHelpers.getRandomText(20, 4, 12)
                    }
                    : null);

            return events;
        }
    }
}
