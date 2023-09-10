import { NodeType } from '../../node/entities/node-type.entity';
import { NodeShape } from '../../node/entities/node-shape.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class NodeTypeSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const nodeTypeRepository = dataSource.getRepository(NodeType);
    const nodeShapeRepository = dataSource.getRepository(NodeShape);

    const nodeShapes = await nodeShapeRepository.find();

    const nodeTypeToInsert = [
      {
        name: 'Init',
        nodeShapeName: 'Circle',
      },
      {
        name: 'End',
        nodeShapeName: 'Circle',
      },
      {
        name: 'Process',
        nodeShapeName: 'Rectangle',
      },
      {
        name: 'Condition',
        nodeShapeName: 'Diamond',
      },
    ];

    for (const nodeTypeData of nodeTypeToInsert) {
      const existingNodeType = await nodeTypeRepository.findOne({
        where: { name: nodeTypeData.name },
      });

      if (existingNodeType) continue;

      const nodeShapeId = nodeShapes.find(
        (nodeShape) => nodeShape.name === nodeTypeData.nodeShapeName,
      ).id;

      await nodeTypeRepository.insert({
        name: nodeTypeData.name,
        nodeShape: { id: nodeShapeId },
      });
    }
  }
}
