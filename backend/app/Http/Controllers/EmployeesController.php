<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEmployeesRequest;
use App\Http\Requests\UpdateEmployeesRequest;
use App\Models\Employees;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Validator;





class EmployeesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $employees = Employees::all();
        return response()->json($employees);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'full_name' => 'required',
        'email' => 'required|email|unique:employees,email',
        'phone_number' => 'required|numeric',
        'country' => 'required',
        'city' => 'required',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 400);
    }

    try {
        DB::beginTransaction();

        $employee = Employees::create($request->all());

        DB::commit();

        return response()->json($employee, 201);
    } catch (\Illuminate\Database\QueryException $e) {
        DB::rollBack();
        return response()->json(['message' => 'Error occurred during employee creation.'], 500);
    }
    }

    /**
     * Display the specified resource.
     */
    public function show(Employees $employees)
    {
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employees $employees)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeesRequest $request, $id)
    {
        $employee = Employees::findOrFail($id);

    $validator = Validator::make($request->all(), [
        'full_name' => 'required',
        'email' => [
            'required',
            'email',
            Rule::unique('employees')->ignore($employee->id),
        ],
        'phone_number' => 'required|numeric',
        'country' => 'required',
        'city' => 'required',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 400);
    }

    $employee->update($request->all());

    return response()->json($employee, 200);

        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $employee = Employees::findOrFail($id);

    $employee->delete();

    return response()->json(['message' => 'Employee deleted successfully.'], 200);
    }
}
