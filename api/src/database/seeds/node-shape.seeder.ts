import { NodeShape } from '../../../src/node/entities/node-shape.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class NodeShapeSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(NodeShape);

    const nodeShapesToInsert = [
      { name: 'Circle' },
      { name: 'Rectangle' },
      { name: 'Diamond' },
    ];

    for (const nodeShapeData of nodeShapesToInsert) {
      const existingNodeShape = await repository.findOne({
        where: { name: nodeShapeData.name },
      });

      if (!existingNodeShape) {
        await repository.insert(nodeShapeData);
      }
    }
  }
}
