const simpleTable = () => {
    return (
        <Card
        style={{height: '200px', overflow: 'scroll'}}
        bordered={false}
        size="small"
        type="inner"
        bodyStyle={{ padding: "0" }}
        title={
          <Space>
            <p style={{ margin: 0 }}>ANWENDER</p>
            <Form>
              <Form.Item style={{ margin: 0 }}>
                <Input.Search enterButton={false} size="small" allowClear placeholder="Search..." onSearch={handleChangeSearch} />
              </Form.Item>
            </Form>
            <Popover content={<a>Close</a>} title="Title" trigger="click" visible={visiblePopOver} onVisibleChange={handleVisibleChange}>
              <Button size="small"><FilterOutlined /> Filter</Button>
            </Popover>
            <Button size="small"><PlusOutlined /> Add</Button>
          </Space>
        }
      >

      <table class="GeneratedTable">
        <thead>
          <tr>
            <th>Header</th>
            <th>Header</th>
            <th>Header</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr>
                <td>{user.TITEL}</td>
                <td>{user.VORNAME}</td>
                <td>{user.NACHNAME}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      </Card>
    );
}