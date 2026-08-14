# 【教程】基于飞书多维表格自动化管理软件项目

本教程介绍如何使用Bridgic Agent构建自动化工作流，来管理一个软件开发项目。在这个教程中，我们使用飞书多维表格来作为软件开发任务的管理面板。本教程详细介绍了以下两个自动化工作流：
- 通过agent上报bug到飞书多维表格。
- 自动化调度任务来定期扫描多维表格中的bug并进行分析。

本教程还展示了Bridgic Agent如何自动拆分并管理子agent的能力。

下面我们马上开始探索之旅！在这个过程中，你无需关注任何一行底层代码。

## 成品展示

在本教程结束后，你将会看到，两个成功构建的工作流：

![工作流截图workflow-card-1.png](./pma-images/workflow-card-1.png)

![工作流截图workflow-card-2.png](./pma-images/workflow-card-2.png)

还有一个定时调度任务：

![工作流截图scheduled-success-result.png](./pma-images/scheduled-success-result.png)

一个基于飞书表格的任务面板：

![工作流截图scheduled-feishu-writeback.png](./pma-images/scheduled-feishu-writeback.png)

学会子agent的概念和管理方式：

![工作流截图sub-agent.png](./pma-images/sub-agent.png)

## 工作流构建教程

### 准备工作

准备你自己的飞书账号，创建一个多维表格出来，用来保存和展示开发任务（新特性开发或Bug记录）。如下：

![工作流截图table-creation.png](./pma-images/table-creation.png)

在飞书开放平台创建一个应用，找到App ID和App Secret。

![工作流截图feishu-app-creation.png](./pma-images/feishu-app-creation.png)


### 流程一：通过agent上报bug

先创建第一个可复用（可重跑）的自动化工作流。

使用“/build”命令开始工作流创建。简洁、准确地描述需求：

![工作流截图new-task-insertion.png](./pma-images/new-task-insertion.png)

Brdgic Agent对于需求中不明确的描述会主动和你确认（需求澄清）：

![工作流截图ask-human-1.png](./pma-images/ask-human-1.png)

![工作流截图ask-human-2.png](./pma-images/ask-human-2.png)

Brdgic Agent还会让你选择或确认一个任务验收标准：

![工作流截图check-condition-1.png](./pma-images/check-condition-1.png)

这里来到了很关键的一步：**任务说明书的确认**！你需要仔细阅读这里的描述，确保工作流的描述符合你的需求。如果你发现不符合需求的地方，可以用鼠标选中相应文字并评论它，然后Brdgic Agent会根据你的评论进行相应的修改。

![工作流截图task-req-1.png](./pma-images/task-req-1.png)

请关注任务说明书中对于“最终交付物”和“验收标准”的描述。

![工作流截图task-req-2.png](./pma-images/task-req-2.png)

至此任务说明书已经确认。接下来请遵照Brdgic Agent的引导进行操作。

![工作流截图building-1.png](./pma-images/building-1.png)

![工作流截图building-2.png](./pma-images/building-2.png)

构建工作流的最后一步：给工作流取个名字。

![工作流截图confirm-workflow-name.png](./pma-images/confirm-workflow-name.png)

工作流创建成功！

![工作流截图create-workflow-sucess.png](./pma-images/create-workflow-sucess.png)

现在你可以在Brdgic Agent的工作流页面中发现一个新创建出来的工作流卡片，如下：

![工作流截图workflow-card-1.png](./pma-images/workflow-card-1.png)

#### 运行工作流

![工作流截图run-workflow-insertion.png](./pma-images/run-workflow-insertion.png)

![工作流截图running-workflow-1.png](./pma-images/running-workflow-1.png)

![工作流截图run-workflow-sucess.png](./pma-images/run-workflow-sucess.png)

这个工作流执行成功后，飞书多维表格中会自动新增一条任务记录。如图：

![工作流截图table-after-insertion.png](./pma-images/table-after-insertion.png)


### 流程二：自动化扫描并分析bug

现在创建第二个可复用的自动化工作流。

使用“/build”命令开始工作流创建。简洁、准确地描述需求：

![工作流截图new-task-bug.png](./pma-images/new-task-bug.png)

Brdgic Agent主动向你进行需求澄清：

![工作流截图clarify-1.png](./pma-images/clarify-1.png)

![工作流截图clarify-2.png](./pma-images/clarify-2.png)

Brdgic Agent提示你选择任务的验收标准：

![工作流截图check-condition-a.png](./pma-images/check-condition-a.png)

![工作流截图check-condition-b.png](./pma-images/check-condition-b.png)

这里来到了很关键的一步：**任务说明书的确认**！你需要仔细阅读这里的描述，确保工作流的描述符合你的需求。如果你发现不符合需求的地方，可以用鼠标选中相应文字并评论它，然后Brdgic Agent会根据你的评论进行相应的修改。

![工作流截图task-req-a.png](./pma-images/task-req-a.png)

请关注任务说明书中对于“最终交付物”和“验收标准”的描述。

![工作流截图task-req-b.png](./pma-images/task-req-b.png)


构建工作流的最后一步：给工作流取个名字。

![工作流截图confirm-workflow-2-name.png](./pma-images/confirm-workflow-2-name.png)

工作流创建成功！

![工作流截图create-workflow-2-sucess.png](./pma-images/create-workflow-2-sucess.png)

现在你可以在Brdgic Agent的工作流页面中发现一个新创建出来的工作流卡片，如下：

![工作流截图workflow-card-2.png](./pma-images/workflow-card-2.png)

#### 定时调度工作流

刚刚创建出来的新工作流，你可以直接运行它。但在这里，我们使用调度功能来定时执行它。

![工作流截图create-schedule.png](./pma-images/create-schedule.png)

![工作流截图config-schedule.png](./pma-images/config-schedule.png)

![工作流截图scheduled-complete.png](./pma-images/scheduled-complete.png)

这时一个定时任务就调度成功了。

已经调度成功的定时任务，可以在“调度”页面进行管理：

![工作流截图scheduled-run.png](./pma-images/scheduled-run.png)

可以随时进来查看定时任务每次的执行过程及结果：

![工作流截图scheduled-run-display.png](./pma-images/scheduled-run-display.png)

我们看到它的执行过程启动了一个**子agent**。鉴于当前执行的这个任务比较特殊，它有一个“扫描代码库并分析bug”的子过程，非常适合使用子agent来完成。因此Bridgic Agent在这个工作流中自动拆分出了一个子agent来完成这个字过程。如下是子agent的执行过程：

![工作流截图sub-agent.png](./pma-images/sub-agent.png)

定时任务这次执行成功后，可以看到执行结果：

![工作流截图scheduled-success-result.png](./pma-images/scheduled-success-result.png)

点击上图中的“查看结果”，可以看到这次任务执行的产出：

![工作流截图scheduled-success-outputs.png](./pma-images/scheduled-success-outputs.png)

最后我们会看到飞书上的任务面板中，记录Bug扫描的字段也已经被自动回填：

![工作流截图scheduled-feishu-writeback.png](./pma-images/scheduled-feishu-writeback.png)


### 更多相关流程的自动化

在这个场景案例中，基于你自己的个性化需求，可以围绕它构建出更多相关的自动化工作流。比如：
- 前面的工作流自动扫描和分析bug后，可以让工程师审批方案合理性，然后扔给Codex、Claude Code之类的coding agent去完成代码修改并PR。
- 某个任务PR后可以自动更新任务面板状态。
- 定期扫描任务面板，监控任务状态，给承接人发消息提醒。
- 等等


## 注意事项

- 用户本地的环境不同，构建过程可能也会碰到很多差异。可能需要根据具体情况来合理处理。尤其是这个工作流底层需要的lark-cli的安装和配置过程，具体的过程体验取决于环境和模型能力。建议使用好模型来构建工作流，然后可以使用次一些的模型来运行它。
- 构建过程中如果发生意外情况，不要慌张，可以随时向agent提问，请它提供更多信息或者让它给建议。在中间过程可以把碰到的问题/疑问都抛给Brdgic Agent。
- Bridgic Agent对于工作流的构建，成功率非常高。只要需求描述清晰且可行，通常能够一次性成功。但偶尔出现失败的情况，也不要紧，可以让Brdgic Agent修复工作流。修复时告诉它你碰到的异常情况。
- 工作流构建出来之后，并非一成不变，Brdgic Agent提供了请打的工作流修改能力。如果你需求有所变动，随时告诉Brdgic Agent：“修复 @XXX工作流，我要XXXX”。
