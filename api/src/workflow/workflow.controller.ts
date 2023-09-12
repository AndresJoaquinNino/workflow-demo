import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { NodeService } from 'src/node/node.service';
import { EdgeService } from 'src/edge/edge.service';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
import { Workflow } from './entities/workflow.entity';
import { PaginatedItemsDto } from 'src/shared/dto/paginated-items.dto';
import { PaginatedResponse } from 'src/shared/types/paginated-response';

@Controller('workflow')
export class WorkflowController {
  constructor(
    private readonly workflowService: WorkflowService,
    private readonly nodeService: NodeService,
    private readonly edgeService: EdgeService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createWorkflowDto: CreateWorkflowDto,
  ): Promise<CreateWorkflowDto> {
    const workflowStored = await this.workflowService.create(createWorkflowDto);
    const workflow = await this.workflowService.findOne(workflowStored.id);

    return workflow;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: PaginatedItemsDto,
  ): Promise<Workflow[] | PaginatedResponse> {
    const { page, limit = 10 } = query;

    if (!page) {
      return this.workflowService.findAll();
    }

    const [workflows, totalWorkflows] = await this.workflowService.paginate(
      page,
      limit,
    );

    const totalPages = Math.ceil(totalWorkflows / limit);

    if (page > totalPages && totalPages > 0) {
      return {
        data: [],
        totalItems: totalWorkflows,
        totalPages: totalPages,
        currentPage: page,
      };
    }

    return {
      data: workflows,
      totalItems: totalWorkflows,
      totalPages: totalPages,
      currentPage: page,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<Workflow> {
    const workflow = await this.workflowService.findOne(+id);
    if (!workflow) {
      throw new NotFoundException([`Workflow with ID ${id} not found`]);
    }
    return workflow;
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateWorkflowDto: UpdateWorkflowDto,
  ): Promise<Workflow> {
    const storedWorkflow = await this.workflowService.findOne(+id);

    if (!storedWorkflow) {
      throw new NotFoundException([`Workflow with ID ${id} not found`]);
    }

    const workflowUpdated = await this.workflowService.update(
      +id,
      updateWorkflowDto,
    );

    if (storedWorkflow.nodes) {
      await this.nodeService.softDeleteNodesByWorkflowId(+id);
      const newNodes = updateWorkflowDto.nodes.map((node) => ({
        ...node,
        workflow: workflowUpdated,
      }));
      await this.nodeService.createMultipleNodes(newNodes);
    }

    if (storedWorkflow.edges) {
      await this.edgeService.softDeleteEdgesByWorkflowId(+id);
      const newEdges = updateWorkflowDto.edges.map((edge) => ({
        ...edge,
        workflow: workflowUpdated,
      }));
      await this.edgeService.createMultipleEdges(newEdges);
    }

    return await this.workflowService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const workflowToDelete = await this.workflowService.findOne(+id);

    if (!workflowToDelete) {
      throw new NotFoundException([`Workflow with ID ${id} not found`]);
    }

    if (workflowToDelete.nodes) {
      await this.nodeService.softDeleteNodesByWorkflowId(+id);
    }

    if (workflowToDelete.edges) {
      await this.edgeService.softDeleteEdgesByWorkflowId(+id);
    }

    await this.workflowService.softDelete(workflowToDelete.id);
  }
}
