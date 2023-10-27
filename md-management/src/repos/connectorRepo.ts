import Container, { Service } from 'typedi';

import config from '@/config.mjs';

import { UniqueEntityID } from '@/core/domain/UniqueEntityID';
import { IConnectorPersistence } from '@/dataschema/IConnectorPersistence';
import { Connector } from '@/domain/connector/connector';
import { ConnectorCode } from '@/domain/connector/connectorCode';
import { ConnectorMap } from '@/mappers/ConnectorMap';
import IConnectorRepo from '@/services/IRepos/IConnectorRepo';
import { Document, FilterQuery, Model } from 'mongoose';

@Service()
export default class ConnectorRepo implements IConnectorRepo {
  private connectorSchema: Model<IConnectorPersistence & Document>;
  constructor(connectorSchema?: Model<IConnectorPersistence & Document>) {
    if (connectorSchema) this.connectorSchema = connectorSchema;
    else this.connectorSchema = Container.get(config.schemas.connector.name);
  }

  public async exists(connector: Connector): Promise<boolean> {
    const idX = connector.id;

    const query = { domainId: idX };
    const connectorDocument = await this.connectorSchema.findOne(
      query as FilterQuery<IConnectorPersistence & Document>
    );

    return !!connectorDocument;
  }

  public async save(connector: Connector): Promise<Connector> {
    const query = { domainId: connector.id } as FilterQuery<IConnectorPersistence & Document>;

    const document = await this.connectorSchema.findOne(query);

    try {
      const raw = ConnectorMap.toPersistence(connector);

      if (!document) {
        const created = await this.connectorSchema.create(raw);
        const domainConnector = await ConnectorMap.toDomain(created);

        if (!domainConnector) throw new Error('Connector not created');
        return domainConnector;
      }

      // there is a document, update it
      document.set(raw);
      await document.save();

      const domainConnector = await ConnectorMap.toDomain(document);
      if (!domainConnector) throw new Error('Connector not created');
      return domainConnector;
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(domainId: UniqueEntityID | string): Promise<Connector | null> {
    const query = { domainId };
    const connectorRecord = await this.connectorSchema.findOne(
      query as FilterQuery<IConnectorPersistence & Document>
    );

    if (connectorRecord != null) return ConnectorMap.toDomain(connectorRecord);
    return null;
  }

  public async findByCode(code: ConnectorCode): Promise<Connector | null> {
    const query: FilterQuery<IConnectorPersistence & Document> = { code: code.value };
    const connectorRecord = await this.connectorSchema.findOne(query);

    if (connectorRecord != null) return ConnectorMap.toDomain(connectorRecord);
    return null;
  }

  public async findAll(): Promise<Connector[]> {
    const records = await this.connectorSchema.find();

    const connectors: Connector[] = [];

    for (const connectorRecord of records) {
      const connector = await ConnectorMap.toDomain(connectorRecord);
      if (connector) connectors.push(connector);
    }

    return connectors;
  }

  public async findByFloorId(floorId: UniqueEntityID): Promise<Connector[]> {
    const query = { $or: [{ floor1: floorId }, { floor2: floorId }] };
    const connectorRecords = await this.connectorSchema.find(
      query as FilterQuery<IConnectorPersistence & Document>
    );

    const connectors: Connector[] = [];

    for (const cRecord of connectorRecords) {
      const c = await ConnectorMap.toDomain(cRecord);
      if (c) connectors.push(c);
    }

    return connectors;
  }

  public async findBetweenFloors(
    floor1Id: UniqueEntityID,
    floor2Id: UniqueEntityID
  ): Promise<Connector | null> {
    const query = {
      $or: [
        { floor1: floor1Id, floor2: floor2Id },
        { floor1: floor2Id, floor2: floor1Id }
      ]
    };

    const connectorRecord = await this.connectorSchema.findOne(
      query as FilterQuery<IConnectorPersistence & Document>
    );

    if (connectorRecord != null) return ConnectorMap.toDomain(connectorRecord);
    return null;
  }

  public async findBetweenMultipleFloors(
    ids1: UniqueEntityID[],
    ids2: UniqueEntityID[]
  ): Promise<Connector[]> {
    const query: FilterQuery<IConnectorPersistence & Document> = {
      $or: [
        { floor1: { $in: ids1 }, floor2: { $in: ids2 } },
        { floor1: { $in: ids2 }, floor2: { $in: ids1 } }
      ]
    };

    const records = await this.connectorSchema.find(
      query as FilterQuery<IConnectorPersistence & Document>
    );

    const connectors: Connector[] = [];

    for (const record of records) {
      const c = await ConnectorMap.toDomain(record);
      if (c) connectors.push(c);
    }

    return connectors;
  }

  public async findOfFloors(ids: UniqueEntityID[]): Promise<Connector[]> {
    const query: FilterQuery<IConnectorPersistence & Document> = {
      $or: [{ floor1: { $in: ids } }, { floor2: { $in: ids } }]
    };

    const records = await this.connectorSchema.find(
      query as FilterQuery<IConnectorPersistence & Document>
    );

    const connectors: Connector[] = [];

    for (const record of records) {
      const c = await ConnectorMap.toDomain(record);
      if (c) connectors.push(c);
    }

    return connectors;
  }
}
